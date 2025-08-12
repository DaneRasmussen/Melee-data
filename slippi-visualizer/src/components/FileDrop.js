// src/components/FileDrop.js
import "./FileDrop.css"
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

async function sendFile(file) {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/server/upload", {
        method: "POST",
        body: form
    });
    if (!res.ok) throw new Error("Upload Failed");
    return res.json();
}

const FileDrop = ({ onParsed }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback(async (acceptedFiles, fileRejections) => {
    setError("");
    if (fileRejections?.length) {
      setError("Only .slp files are allowed (≤20MB).");
      return;
    }
    const file = acceptedFiles?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = await sendFile(file);
      // console.log(data.res)
      onParsed?.(data);
    } catch (e) {
      console.error(e);
      setError(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [onParsed]);

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/octet-stream": [".slp"] }, // extension is the important part
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className="file-drop-wrapper">
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ddd",
          padding: "30px",
          textAlign: "center",
          borderRadius: "8px",
          color: isDragActive ? "#eee" : "#222255",
          backgroundColor: isDragActive ? "#7878c2ff" : "#4DBF70",
          cursor: "pointer",
          opacity: uploading ? 0.7 : 1,
        }}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Drop the .slp file here..."
            : "Drag and drop a .slp file here, or click to browse"}
        </p>

        {acceptedFiles.length > 0 && !uploading && (
          <div style={{ marginTop: "10px", fontWeight: "bold" }}>
            Selected file: {acceptedFiles[0].name}
          </div>
        )}

        {uploading && <div style={{ marginTop: "10px" }}>Uploading…</div>}
        {error && <div style={{ marginTop: "10px", color: "#400" }}>{error}</div>}
      </div>
    </div>
  );
};

export default FileDrop;