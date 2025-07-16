import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      "Only valid Gmail addresses allowed"
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
});

export const emailSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    "Only valid Gmail addresses allowed"
  );
