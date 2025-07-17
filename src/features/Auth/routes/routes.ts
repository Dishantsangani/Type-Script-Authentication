import express from "express";
import { signUp, signIn } from "../Contoller/controller";
import { validate } from "../Middleware/validate";
import { signinSchema } from "../Schema/Schema";

const authRouter = express.Router();

authRouter.post("/signup", validate(signinSchema), signUp);
authRouter.post("/signin", validate(signinSchema), signIn);

export default authRouter;
