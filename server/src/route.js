import express from "express";
import {
  login,
  logout,
  createUser,
  createTopic,
  getAllTopic,
} from "./controller.js";
import {
  validateLogin,
  validateSignUp,
  validateTopic,
} from "./middlewares/validators/main.js";
import { verifyAuth } from "./middlewares/auth-handler.js";

const router = express.Router();

// ? [PUBLIC] ROUTES
router.route("/api/login").post(validateLogin, login);
router.route("/api/user").post(validateSignUp, createUser);

// ! [PRIVATE] ROUTES
router.use(verifyAuth);
router.route("/api/logout").delete(logout);
router.route("/api/topic").post(validateTopic, createTopic).get(getAllTopic);
export default router;
