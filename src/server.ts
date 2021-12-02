import express from "express";
import { router } from "./routes";
import cors from "cors";
import "./database";
require("dotenv").config();
import formData from "express-form-data";

const app = express();
const port = process.env.HOST_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());
app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`server is listening on ${process.env.HOST_URL}:${port}`);
});
