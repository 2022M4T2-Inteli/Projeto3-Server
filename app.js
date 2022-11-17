const express = require("express");
const routes = require("./routes/index");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5500;

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    // accept vercel
    // origin: "https://projeto3-client.vercel.app/",

    // accept any request from any origin
    origin: "*",
  })
);

app.use(express.json());

app.use("/", routes);

mongoose
  .connect(
    // 'mongodb+srv://joaoalca:joaoalca123@apicluster.ldpol3f.mongodb.net/bancodaapi?retryWrites=true&w=majority'
    process.env.MONGO_URI
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Page server running at http://127.0.0.1:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
