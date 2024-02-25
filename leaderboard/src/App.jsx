import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const testList = ["item 1", "item 2", "item 3"];
  //const [allScores, setAllScores] = useState([]);

  useEffect(() => {
    axios
      .get(`https://dino-hacks.kintone.com/k/v1/record.json?app=2&id=1`, {
        headers: {
          "X-Cybozu-API-Token": "yRjHAwzUDPKrHETtpdnikulHRGNnMeu75iqPaMGQ",
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
