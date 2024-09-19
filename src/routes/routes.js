import express from "express";
import validateReqBody from "../middlewares/validatedBody.js";
import { schemaCreateUser } from "../schemas/userSchema.js";

import { userRegister } from "../controllers/usersControllers.js";



const router = express.Router();

router.post("/register",validateReqBody(schemaCreateUser), userRegister);

export default router;