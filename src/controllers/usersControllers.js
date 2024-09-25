import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  emailExists,
  createUser,
  findUserByEmail,
} from "../models/usersModels.js";

export async function userRegister(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    const isEmailTaken = await emailExists(email);

    if (isEmailTaken) {
      return res.status(400).json({ message: "email already exists" });
    }

    const cleanNumber = phone.replace(/\D/g, "");
    const password_hash = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, password_hash, cleanNumber);

    const { password_hash: _, ...safeInfoUser } = user;
    return res.status(201).json(safeInfoUser);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "User not found." });
    }

    const id = { userId: user.id };
    const token = jwt.sign(id, process.env.SECRET, { expiresIn: "24h" });
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json(error);
  }
}
