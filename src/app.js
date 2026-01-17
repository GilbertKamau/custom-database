import http from "http";
import Storage from "./engine/storage.js";

export default class App {
  start(port = 3000) {
    http.createServer((req, res) => {
      const data = new Storage("users").readAll();
      res.end(JSON.stringify(data));
    }).listen(port);

    console.log(`API running on port ${port}`);
  }
}

