import express from "express";
import authRouter from "../Auth/routes/routes";

const featureRouter = express.Router();

featureRouter.use("/auth", authRouter);

export default featureRouter;
