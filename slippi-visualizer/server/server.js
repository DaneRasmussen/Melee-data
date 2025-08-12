const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const multer = require("multer");
const pino = require("pino");
const { SlippiGame } = require("@slippi/slippi-js");

dotenv.config()
const app = express()
const logger = pino( { level: "info" } );

const PORT = process.env.PORT || 5001;

const uploadsDir = path.join(__dirname, "uploads");
fs.mkdirSync(uploadsDir, {recursive: true});

// Multer
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const ok = file.originalname.toLowerCase().endsWith(".slp");
        cb(ok ? null : new Error("Only .slp files allowed"), ok)
    },
    limits: { fileSize: 20 * 1024 * 1024 }
});


// Health
// app.get("/server/health", (_req, res) => res.json({ ok: true }));

// upload + parse
app.post("/server/upload", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const filePath = req.file.path;
        const game = new SlippiGame(filePath);

        const settings = game.getSettings();
        // console.log(settings)
        const metadata = game.getMetadata();
        const stats = game.getStats();

        const payload = {
            stage: settings?.stageId,
            players: settings?.players?.map(p => ({
                port: p?.port,
                characterId: p?.characterId,
                nametag: p?.nametag
            })),
            playerOneActionCount: stats.actionCounts[0],
            playerTwoActionCount: stats.actionCounts[1],
            durationFrames: metadata?.lastFrame ?? null,
            conversions: stats?.conversions ?? [],
            combos: stats?.combos ?? [],
        };
        console.log(payload)
        fs.unlink(filePath, () => {});
        res.json(payload);

    } catch (err) {
        logger.error(err);
        if (req?.file?.path) fs.unlink(req.file.path, () => {});
        res.status(500).json({ error: "Failed to parse .slp file" })
    }
});

app.listen(PORT, () => logger.info(`API listening on http://localhost:${PORT}`))
