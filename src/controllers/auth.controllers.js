import { deleteTokenFromDB } from "../repositories/auth.repositories.js";

export async function logout(req, res) {
  const { token } = req.headers.authorization?.replace("Bearer ", "");

  try {
    await deleteTokenFromDB(token);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
