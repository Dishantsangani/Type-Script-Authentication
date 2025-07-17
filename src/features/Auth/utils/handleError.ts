import { Response } from "express";
import { EmailAlreadyExistsError } from "./customError";

export function handleError(res: Response, err: unknown): Response {
  if (err instanceof EmailAlreadyExistsError) {
    return res.status(409).json({ message: err.message });
  }

  console.error("Unexpected error:", err);
  return res.status(500).json({ message: "Internal server error" });
}
