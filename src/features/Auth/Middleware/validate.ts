import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errorDetails = formatZodError(result.error);
      return res.status(400).json({ errors: errorDetails });
    }
    req.body = result.data;
    next();
  };

function formatZodError(error: ZodError): Record<string, string> {
  return Object.fromEntries(
    error.issues.map((issue) => [issue.path.join("."), issue.message])
  );
}
