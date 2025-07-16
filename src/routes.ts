import express from "express";
import featureRouter from "./features/Routes/routes";

const baseRouter = express.Router();

baseRouter.use("/api", featureRouter);

export default baseRouter;
