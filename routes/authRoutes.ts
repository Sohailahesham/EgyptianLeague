import express from 'express';
import { getAllUsers, login, logout, register } from '../controllers/auth.controller';
import { asyncWrapper } from '../middlewares/wrapper';
import { validator } from '../middlewares/validation';
import { loginValidation, registerValidation } from '../middlewares/validationArrays';
import verifyToken from '../middlewares/verifyToken';
import { isTokenRevoked } from '../middlewares/isTokenRevoked';

const router = express.Router();

router.route("/").get(verifyToken ,asyncWrapper(getAllUsers))
router.route("/register").post(registerValidation, validator, asyncWrapper(register));
router.route("/login").post(loginValidation,validator, asyncWrapper(login));
router.route("/logout").post(verifyToken, isTokenRevoked, asyncWrapper(logout));

export default router;