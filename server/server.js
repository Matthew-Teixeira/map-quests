require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/connection");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static("public"));


app.use(require("./routes"));

// Serve frontend
if ((process.env.NODE_ENV = "production")) {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    );
  });
}

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("Listning at port: " + PORT);
  });
});
