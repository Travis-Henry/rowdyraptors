import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const testList = ["item 1", "item 2", "item 3"];
  //const [allScores, setAllScores] = useState([]);


  //   const client = new KintoneRestAPIClient({
  //    baseUrl: "https://dino-hacks.kintone.com",
  // //   // Use password authentication
  // //   // auth: {
  // //   //   username: process.env.KINTONE_USERNAME,
  // //   //   password: process.env.KINTONE_PASSWORD,
  // //   // },
  // //   //Use API token authentication
  //   auth: { apiToken: "S3N65FATzOFoob0bgr40vcBVccyKiGVLFUdw8N1M" }
  // //   //Use OAuth token authentication
  // //   //auth: { oAuthToken: process.env.KINTONE_OAUTH_TOKEN }
  
  // //   // Use session authentication if `auth` is omitted (in browser only)
  // });

  // client.record
  //   .getRecords({ app: "3", id: "2" })
  //   .then((resp) => {
  //     console.log(resp.records);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  useEffect(() => {
    axios
      .get(`https://dino-hacks.kintone.com/k/v1/record.json`, {
        headers: {
          "X-Cybozu-API-Token": "S3N65FATzOFoob0bgr40vcBVccyKiGVLFUdw8N1M",
          "id": "2",
          "app": "3",
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
