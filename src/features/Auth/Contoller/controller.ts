import { Request, Response } from "express";
import { z } from "zod";
import { signinSchema } from "../Schema/Schema";
import { findUserByEmail, userHashPassword } from "../Services/services";
import { EmailAlreadyExistsError } from "../utils/validerr";

async function signIn(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = signinSchema.parse(req.body);

    await findUserByEmail(email);

    await userHashPassword(password, email);

    return res.status(201).json({
      message: "User Created successfully",
    });
  } catch (err) {
    if (err instanceof EmailAlreadyExistsError) {
      return res.status(409).json({ message: err.message });
    }
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }
    console.error("Signin error:", (err as Error).message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function signUp(req: Request, res: Response) {}

export { signIn, signUp };
