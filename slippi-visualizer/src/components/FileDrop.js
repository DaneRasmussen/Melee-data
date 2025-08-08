// src/components/FileDrop.js
import "./FileDrop.css"
import React from "react";
import { useDropzone } from "react-dropzone";

const FileDrop = ({ onFileAccepted }) => {
  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    accept: { 'application/octet-stream': ['.slp'] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]); // send the first file to the parent
      }
    }
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
            color: isDragActive ?  "#eee" : "#222255",
            backgroundColor: isDragActive ? "#7878c2ff" : "#4DBF70",
            cursor: "pointer",
        }}
        >
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop the .slp file here..." : "Drag and drop a .slp file here, or click to browse"}</p>

        {acceptedFiles.length > 0 && (
            <div style={{ marginTop: "10px", fontWeight: "bold" }}>
            Selected file: {acceptedFiles[0].name}
            </div>
        )}
        </div>
    </div>
  );
};

export default FileDrop;
