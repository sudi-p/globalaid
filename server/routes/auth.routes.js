import express from "express";
import {
  login,
  register,
  refresh,
  logout,
} from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/login/", login);
router.post("/register/", register);
router.post("/refresh/", refresh);
router.post("/logout/", logout);

export default router;
