import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import baseRouter from "./routes";
import "./db/db";

dotenv.config();

const app = express();
const Port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173", // frontend
    credentials: true,
  })
);

app.use(express.json());

app.use(baseRouter);

app.listen(Port, () =>
  console.log(`server start at port http://localhost:${Port}`)
);
