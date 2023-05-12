import { Router } from "express";
import { validation } from "../../middlewear/validation.js";
import {
  signin,
  signup,
  verifyEmail,
  refreshToken,
  sendCode,
  forgetPassword,
  allCourses,
} from "./controller/auth.controller.js";
import * as validators from "./auth.validatores.js";
import { adminAuth } from "../../middlewear/auth.js";
const router = Router();

router.post("/signup",validation(validators.signup), signup);
router.post("/signin",validation(validators.signin),  signin);
router.get("/allCourses", allCourses);
router.get("/verify/:token", verifyEmail);
router.get("/reguestEmailToken/:token", refreshToken);
router.patch("/sendCode", sendCode);
router.patch("/forgetpassword", forgetPassword);

export default router;
