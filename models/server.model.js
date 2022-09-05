const express = require("express");
const bodyParser = require("body-parser");


console.log("Server instance running");


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      scrape: "/api/v1",
     };

    this.middlewares();
    this.routes();
  }



  middlewares() {
    this.app.use(express.json());
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
    this.app.use(express.static("public"));
  }

    
  routes() {
    this.app.use(this.paths.scrape, require("../routes/scrape.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`);
    });
  }
}



module.exports = Server;

