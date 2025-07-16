export const INSERT_USER = `INSERT INTO typeauth (email, password) VALUES ($1, $2) RETURNING id, email;`;
export const CHECK_USER = `SELECT * FROM typeauth WHERE email = $1`;
export const GET_USER = `SELECT * FROM typeauth`;

// Forgot_Password
export const INSERT_TOKEN_EMAIL = `INSERT INTO password_reset_tokens (email, token, expires_at) VALUES ($1, $2, $3)`;
export const FIND_TOKEN = `SELECT email, expires_at FROM password_reset_tokens WHERE token = $1`;
export const UPDATE_MAIN_TABLE_PASSSWORD = `UPDATE typeauth SET password = $1 WHERE email = $2`;
export const DELETE_TOKEN = `DELETE FROM password_reset_tokens WHERE token = $1`;
