import express from "express";
import { signIn } from "../Contoller/controller";

const authRouter = express.Router();

authRouter.post("/signin", signIn);

export default authRouter;
