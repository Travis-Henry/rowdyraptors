import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
// import { KintoneRestAPIClient } from "@kintone/rest-api-client";

function App() {
  const testList = ["item 1", "item 2", "item 3"];
  const scoreboardData = [
    ["Player 1", "5", "5"],
    ["Player 2", "3", "7"],
    ["Player 3", "4", "6"],
    // Add more players and scores as needed
  ];
  //const [allScores, setAllScores] = useState([]);

  // const client = new KintoneRestAPIClient({
  //   baseUrl: "https://dino-hacks.kintone.com",
  //   //   // Use password authentication
  //   //   // auth: {
  //   //   //   username: process.env.KINTONE_USERNAME,
  //   //   //   password: process.env.KINTONE_PASSWORD,
  //   //   // },
  //   //   //Use API token authentication
  //   auth: { apiToken: "S3N65FATzOFoob0bgr40vcBVccyKiGVLFUdw8N1M" },
  //   //   //Use OAuth token authentication
  //   //   //auth: { oAuthToken: process.env.KINTONE_OAUTH_TOKEN }

  //   //   // Use session authentication if `auth` is omitted (in browser only)
  // });

  // client.record
  //   .getRecords({ app: "3", id: "2" })
  //   .then((resp) => {
  //     console.log(resp.records);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // useEffect(() => {
  //   axios
  //     .get(`https://dino-hacks.kintone.com/k/v1/record.json`, {
  //       headers: {
  //         "X-Cybozu-API-Token": "S3N65FATzOFoob0bgr40vcBVccyKiGVLFUdw8N1M",
  //         "id": "2",
  //         "app": "3",
  //       },
  //     })
  //     .then((res) => {
  //       console.log("Test data");
  //       console.log(res.data);
  //     })
  //     .catch((error) => console.log(error + "     Test"));
  // }, []);

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
