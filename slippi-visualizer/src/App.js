import './App.css';
import FileDrop from './components/FileDrop';
import React from "react";

function App() {
  const handleFileAccepted = (file) => {
    console.log("File received:", file);
  };



  return (
    <div className="App">
      <p className="title-card">Slippi Match Visualizer</p>
      <hr className="title-line-break"/>
      <FileDrop onFileAccepted={handleFileAccepted} />
    </div>
  );
}

export default App;
