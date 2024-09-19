import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { emailExists, createUser } from "../models/usersModels.js";

export async function userRegister(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    const isEmailTaken = await emailExists(email);

    if (isEmailTaken) {
      return res.status(400).json({ message: "email already exists" });
    } 

    const cleanNumber = phone.replace(/\D/g, '');
    const password_hash = await bcrypt.hash(password, 10);  
    const user = await createUser(name, email, password_hash, cleanNumber);

    const { password_hash: _, ...safeInfoUser } = user;
    return res.status(201).json(safeInfoUser);
  } catch (error) {
    return res.status(500).json(error);
  }
}
