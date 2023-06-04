import { signUpRegister } from "../repositories/auth.repositories.js";
import { findUserByEmail } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { updateTokenOnDB } from "../services/session.service.js";
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

export async function signUp(req, res) {
  try {
    await signUpRegister(req.body);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  try {
    const userPassword = req.body.password

    const user = await findUserByEmail(req)

    if (!user || !bcrypt.compareSync(userPassword, user.password)) {
      return res.status(401).send("Credenciais inválidas")
    }

    const { id, userName, email, pictureUrl, password } = user

    const token = Jwt.sign({ userId: id, name: userName, img: pictureUrl }, process.env.SECRET_KEY, {
      expiresIn: '1d'
    })
    
    await updateTokenOnDB(token, id)

    return res.send({ id, userName, email, pictureUrl, password, token })
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// export async function signIn(req, res) {
//   try {
//     const userPassword = req.body.password

//     const { id, userName, email, pictureUrl, password } = await findUserByEmail(req)

//     if (!bcrypt.compareSync(userPassword, password)) return res.status(401).send("credenciais inválidas")

//     const token = Jwt.sign({ userId: id, name: userName, img: pictureUrl }, process.env.SECRET_KEY, {
//       expiresIn: '1d'
//     })
    
//     await updateTokenOnDB(token, id)

//     return res.send({ id, userName, email, pictureUrl, password, token })
//   } catch (err) {
//     res.status(500).send(err.message);
//   }

// }