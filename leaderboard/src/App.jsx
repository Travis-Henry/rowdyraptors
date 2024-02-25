import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { KintoneRestAPIClient } from "@kintone/rest-api-client";

function App() {
  const testList = ["item 1", "item 2", "item 3"];
  //const [allScores, setAllScores] = useState([]);

  // const client = new KintoneRestAPIClient({
  //   baseUrl: "https://example.cybozu.com",
  //   // Use password authentication
  //   auth: { apiToken: process.env.KINTONE_API_TOKEN },
  // });

  // var url = "https://dino-hacks.kintone.com/k/v1/record.json";
  // var method = "GET";
  // var headers = {
  //   "Content-Type": "application/json",
  //   "X-Cybozu-API-Token": "S3N65FATzOFoob0bgr40vcBVccyKiGVLFUdw8N1M",
  // };

  // var params = {
  //   app: 3,
  //   id: 2,
  // };

  // useEffect(() => {
  //   const client = new KintoneRestAPIClient();
  //   client
  //     .proxy(url, method, headers, params)
  //     .then(function (r) {
  //       console.log(JSON.parse(r));
  //     })
  //     .catch(function (e) {
  //       console.log(e);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`https://dino-hacks.kintone.com/k/v1/record.json?app=4&id=1`, {
        headers: {
          "Access-Control-Allow-Origin": "localhost",
          "X-Cybozu-API-Token": "qIGBRlV8dC2TR0qgUhAMbk3h0JaTAKgkqg8rmHOQ",
        },
      })
      .then((res) => {
        console.log("Test data");
        console.log(res.data);
      })
      .catch((error) => console.log(error + "     Test"));
  }, []);

  return (
    <>
      {testList.map((element) => (
        <h3>{element}</h3>
      ))}
    </>
  );
}

export default App;
