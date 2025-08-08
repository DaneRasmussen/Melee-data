// src/components/FileDrop.js

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
    <div
      {...getRootProps()}
      style={{
        border: "2px dashed #888",
        padding: "30px",
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
        cursor: "pointer"
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
  );
};

export default FileDrop;
