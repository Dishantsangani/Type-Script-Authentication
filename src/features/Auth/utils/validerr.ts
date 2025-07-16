// src/errors/EmailAlreadyExistsError.ts
export class EmailAlreadyExistsError extends Error {
  constructor(message = "Email already in use") {
    super(message);
    this.name = "Email Already Exists Error";
  }
}
