// Overwriting console.log to send output to a file instead of stdout
const fs = require("fs");

const logStream = fs.createWriteStream("log.txt", {flags: "a"});

console.log = function (...args) {
    const output = args.map(arg => typeof arg == "object" ? JSON.stringify(arg, null, 2): arg).join(" \n")
    logStream.write(output);
    // Uncomment line below to have console.log also output to the terminal
    // process.stdout.write(args)
}





const { SlippiGame } = require("@slippi/slippi-js");

const game = new SlippiGame("slp/pummel.slp");

// Get game settings – stage, characters, etc
const settings = game.getSettings();
console.log("settings", settings);

// Get metadata - start time, platform played on, etc
const metadata = game.getMetadata();
console.log("metadata", metadata);

// Get computed stats - openings / kill, conversions, etc
const stats = game.getStats();
console.log("stats", stats);

// Get frames – animation state, inputs, etc
// This is used to compute your own stats or get more frame-specific info (advanced)
const frames = game.getFrames();
console.log("frames", frames[0].players); // Print frame when timer starts counting down