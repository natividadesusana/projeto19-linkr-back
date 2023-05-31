import { db } from "../database/database.connection.js";

export function deleteTokenFromDB(token) {
  return db.query(`DELETE FROM sessions WHERE token = $1;`, [token]);
}
