import express from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import persons from "./routes/persons";
import { fileURLToPath } from "url";

import cors from "cors";
// import highSalary from "./data/afrad/highSalary.json";

// import { importIntoPeopleCollection } from "./importIntoPeopleCollection";

// mongoose.set("debug", true);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.set("views", path.join("views"));

app.set("view engine", "pug");

app.use(logger("tiny"));

// app.use("/static", )
app.use(
  "/static",
  express.static(path.join(__dirname, "./client/build/static"))
);

app.use(cors("*"));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.raw({ type: "application/octet-stream", limit: "20mb" }));

app.use(express.json({ limit: "20mb" }));

app.use(cookieParser());

/// routes

app.use("/auth", authRoutes);
app.use("/persons", persons);
app.use(express.static("data"));

app.get("*", function (req, res) {
  res.sendFile("index.html", { root: path.join(__dirname, "./client/build/") });
});
/////

mongoose
  .connect("mongodb://localhost/vaccinations", {
    useNewUrlParser: true,
  })
  .then((err, res) => {
    console.log("mongoose is connected");
  })
  .catch((err) => {
    console.log("err", err);
  });

// await importIntoPeopleCollection(highSalary);

export default app;
