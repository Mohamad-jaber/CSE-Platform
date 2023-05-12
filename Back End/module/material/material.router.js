import { Router } from "express";
import { adminAuth, auth } from "../../middlewear/auth.js";
import { getMaterial } from "./controller/material.controller.js";



const router = Router();


router.get(`/:id/:category`,getMaterial)

export default router;