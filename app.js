const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors({
  origin: '*',
  methods: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(bodyParser.json());
app.use('/images', express.static('public/images'));
const creatorRoutes = require("./routes/creatorRoutes");
const companyRoutes = require("./routes/companyRoutes");

const DB_URL = process.env.DB_URL;
async function main() {
  try {
    await mongoose.connect(DB_URL).then(() => {
      console.log("connected to database");
    });
  } catch (err) {
    console.log(err);
    console.log("error connecting to database");
  }
}
main();
app.use("/api/v1",creatorRoutes);
app.use("/api/v1",companyRoutes);

app.get("/", (req, res) => {
  res.send("test");
});
// const PORT = 2000;

app.listen(process.env.PORT||2000, () => {
  console.log(`listening on port`);
});
