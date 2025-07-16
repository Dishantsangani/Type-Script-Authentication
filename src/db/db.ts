import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const dbport: number = process.env.DATABASE_PORT
  ? parseInt(process.env.DATABASE_PORT)
  : 5432;

const pool = new Pool({
  user: process.env.DATABASE_USER || "postgres",
  host: process.env.DATABASE_HOST || "localhost",
  port: dbport,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
});

(async () => {
  try {
    await pool.connect();
    console.log("✅ Database Connected");
  } catch (err) {
    console.error("❌ Database Not Connected:", (err as Error).message);
  }
})();

export default pool;
