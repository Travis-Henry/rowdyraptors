import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const testList = ["item 1", "item 2", "item 3"];
  const scoreboardData = [
    ["Player 1", "5", "5"],
    ["Player 2", "3", "7"],
    ["Player 3", "4", "6"],
    // Add more players and scores as needed
  ];

  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th># Correct</th>
            <th># Wrong</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the 2-dimensional array to render rows */}
          {scoreboardData.map((player, index) => (
            <tr key={index}>
              <td>{player[0]}</td>
              <td>{player[1]}</td>
              <td>{player[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
