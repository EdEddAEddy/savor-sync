import express from "express";
import validate from "../middlewares/validate.js";
import { schemaCreateUser } from "../schemas/userSchema.js";

import { userRegister, userLogin } from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/register", validate(schemaCreateUser, "body"), userRegister);
router.post("/login", userLogin);

export default router;
