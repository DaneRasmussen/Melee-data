import marthIcon          from "./assets/stock-icons/marth.png"
import bowserIcon         from "./assets/stock-icons/bowser.png"
import captainfalconIcon  from "./assets/stock-icons/captainfalcon.png"
import donkeykongIcon     from "./assets/stock-icons/donkeykong.png"
import drmarioIcon        from "./assets/stock-icons/drmario.png"
import falcoIcon          from "./assets/stock-icons/falco.png"
import foxIcon            from "./assets/stock-icons/fox.png"
import ganondorfIcon      from "./assets/stock-icons/ganondorf.png"
import iceclimbersIcon    from "./assets/stock-icons/iceclimbers.png"
import jigglypuffIcon     from "./assets/stock-icons/jigglypuff.png"
import kirbyIcon          from "./assets/stock-icons/kirby.png"
import linkIcon           from "./assets/stock-icons/link.png"
import luigiIcon          from "./assets/stock-icons/luigi.png"
import marioIcon          from "./assets/stock-icons/mario.png"
import mewtwoIcon         from "./assets/stock-icons/mewtwo.png"
import mrgameandwatchIcon from "./assets/stock-icons/mrgameandwatch.png"
import nessIcon           from "./assets/stock-icons/ness.png"
import peachIcon          from "./assets/stock-icons/peach.png"
import pichuIcon          from "./assets/stock-icons/pichu.png"
import pikachuIcon        from "./assets/stock-icons/pikachu.png"
import royIcon            from "./assets/stock-icons/roy.png"
import samusIcon          from "./assets/stock-icons/samus.png"
import sheikIcon          from "./assets/stock-icons/sheik.png"
import yoshiIcon          from "./assets/stock-icons/yoshi.png"
import younglinkIcon      from "./assets/stock-icons/younglink.png"
import zeldaIcon          from "./assets/stock-icons/zelda.png"


import './App.css';
import FileDrop from './components/FileDrop';
import { useState } from "react";

function App() {
  const [results, setResults] = useState(null);

  const characterMap = {
    0: "Captain Falcon",
    1: "Donkey Kong",
    2: "Fox",
    3: "Mr. Game & Watch",
    4: "Kirby",
    5: "Bowser",
    6: "Link",
    7: "Luigi",
    8: "Mario",
    9: "Marth",
    10: "Mewtwo",
    11: "Ness",
    12: "Peach",
    13: "Pikachu",
    14: "Ice Climbers",
    15: "Jigglypuff",
    16: "Samus",
    17: "Yoshi",
    18: "Zelda",
    19: "Sheik",
    20: "Falco",
    21: "Young Link",
    22: "Dr. Mario",
    23: "Roy",
    24: "Pichu",
    25: "Ganondorf"
    // 25–32 are unused/debug/variations in some builds — handle accordingly
  };

  const characterIcons = {
    9:  marthIcon,       
    5:  bowserIcon,
    0:  captainfalconIcon,  
    1:  donkeykongIcon,
    22: drmarioIcon,
    20: falcoIcon,
    2:  foxIcon,
    25: ganondorfIcon,
    14: iceclimbersIcon,
    15: jigglypuffIcon,
    4:  kirbyIcon,
    6:  linkIcon,
    7:  luigiIcon,
    8:  marioIcon,
    10: mewtwoIcon,
    3:  mrgameandwatchIcon,
    11: nessIcon,
    12: peachIcon,
    24: pichuIcon,
    13: pikachuIcon,
    23: royIcon,
    16: samusIcon,
    19: sheikIcon,
    17: yoshiIcon,
    21: younglinkIcon,
    18: zeldaIcon          
  }

  function getCharacterName(id) {
    return characterMap[id] || "Unkown Character";
  }

  function getStockIcon(id) {
    return <img src={characterIcons[id]} alt={`${getCharacterName(id)}` } />
  }

  const handleFileAccepted = (file) => {
    console.log("File received:", file);
  };



  return (
    <div className="App">
      <p className="title-card">Slippi Match Visualizer</p>
      <hr className="title-line-break"/>
      <FileDrop onParsed={setResults} />


      {results && (
        <section style={{ marginTop: 24,
            color: "#FFFFFF"
         }}>
          <h2>Match Summary</h2>
          
          <h4>{getStockIcon(9)} {results.players[0].nametag || "Player 1"}  VS {results.players[1].nametag || "Player 1"}: {getCharacterName(results.players[1].characterId)} </h4>
          <table className="slp-table">
            <thead>
              <tr>
                <th>Overall</th>
                <th>Player 1</th>
                <th>Player 2</th>
              </tr>
            </thead>
            <tbody>
              <tr className="section-header"><td colSpan="3">Offense</td></tr>
              <tr>
                <td>Kills</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Damage Done</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Opening Conversion Rate</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Openings / Kill</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Damage / Opening</td>
                <td></td>
                <td></td>
              </tr>
              <tr className="section-header"><td colSpan="3">Defense</td></tr>
              <tr>
                <td>Actions (Roll / Air Dodge / Spot Dodge)</td>
                <td>{results.playerOneActionCount.rollCount} / {results.playerOneActionCount.airDodgeCount} / {results.playerOneActionCount.spotDodgeCount}</td>
                <td>{results.playerTwoActionCount.rollCount} / {results.playerTwoActionCount.airDodgeCount} / {results.playerTwoActionCount.spotDodgeCount}</td>
              </tr>
              <tr className="section-header"><td colSpan="3">Neutral</td></tr>
              <tr>
                <td>Neutral Wins</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Counter Hits</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Beneficial Trades</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Actions (Wavedash / Waveland / Dash Dance / Ledgegrab)</td>
                <td>{results.playerOneActionCount.wavedashCount} / {results.playerOneActionCount.wavelandCount} / {results.playerOneActionCount.dashDanceCount} / {results.playerOneActionCount.ledgegrabCount}</td>
                <td>{results.playerTwoActionCount.wavedashCount} / {results.playerTwoActionCount.wavelandCount} / {results.playerTwoActionCount.dashDanceCount} / {results.playerTwoActionCount.ledgegrabCount}</td>
              </tr>
              <tr className="section-header"><td colSpan="3">General</td></tr>
              <tr>
                <td>Inputs / Minute</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Digital Inputs / Minute</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>L-Cancel Success Rate</td>
                <td>{ ( results.playerOneActionCount.lCancelCount.success / results.playerOneActionCount.lCancelCount.fail ) * 100}% ({results.playerOneActionCount.lCancelCount.success} / {results.playerOneActionCount.lCancelCount.fail})</td>
                <td>{ ( results.playerTwoActionCount.lCancelCount.success / results.playerTwoActionCount.lCancelCount.fail ) * 100}% ({results.playerTwoActionCount.lCancelCount.success} / {results.playerTwoActionCount.lCancelCount.fail})</td>
              </tr>
            </tbody>
          </table>
          <div>Stage ID: { results.stage }</div>
          <div>Duration (frames): {results.durationFrames} (time): {results.durationFrames/3600 >= 1 ? <span>{results.durationFrames/3600}:</span>:<span>{results.durationFrames%60} seconds</span>}</div>

          <h3 style={{ marginTop: 16 }}>Players</h3>
          <ul>
            {results.players?.map(p => (
              <li key={p.port}>
                Port {p.port}: char {getCharacterName(p.characterId)} {p.tag ? `(${p.tag})` : ""}
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: 16 }}>Top Combos (preview)</h3>
          <ul>
            {results.combos?.slice(0, 5).map((c, i) => (
              <li key={i}>
                Start {c.startFrame}, End {c.endFrame}, DidKill: {String(c.didKill)}
              </li>
            ))}
          </ul>
        </section>
      )}


    </div>

    
  );
}

export default App;
