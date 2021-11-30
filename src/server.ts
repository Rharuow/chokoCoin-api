import express from "express";
import { router } from "./routes";
import "./database";
require("dotenv").config();

const app = express();
const port = process.env.HOST_PORT;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`server is listening on ${process.env.HOST_URL}:${port}`);
});
