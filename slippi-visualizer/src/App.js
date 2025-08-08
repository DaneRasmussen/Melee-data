import './App.css';
import FileDrop from './components/FileDrop';
import React from "react";

function App() {
  const handleFileAccepted = (file) => {
    console.log("File received:", file);
  };



  return (
    <div className="App">
      <h1>Slippi Match Visualizer</h1>
      <FileDrop onFileAccepted={handleFileAccepted} />
    </div>
  );
}

export default App;
