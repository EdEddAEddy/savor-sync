import express from "express";
import validate from "../middlewares/validate.js";
import { schemaCreateUser, schemaUserLogin } from "../schemas/userSchema.js";
import { tokenVerify } from "../middlewares/authentication.js";
import { userRegister, userLogin } from "../controllers/usersControllers.js";

const router = express.Router();

router.post("/login", validate(schemaUserLogin, "body"), userLogin);
router.post("/register", validate(schemaCreateUser, "body"), userRegister);

router.use(tokenVerify)

export default router;
