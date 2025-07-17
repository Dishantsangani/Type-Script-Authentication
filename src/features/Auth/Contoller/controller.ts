import { Request, Response } from "express";
import { generateToken, registerUser } from "../Services/services";
import { handleError } from "../utils/handleError";

async function signUp(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;
  try {
    const user = await registerUser({ email, password });
    generateToken(res, { id: user.id, email: user.email });
    return res.status(201).json({ message: "create a new user" });
  } catch (err) {
    return handleError(res, err);
  }
}

async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
  } catch (err) {
    return handleError(res, err);
  }
}

export { signUp, signIn };
