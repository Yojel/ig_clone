import { Router } from "express";

import { authControllers } from "../controllers";

const router = Router();

router.post("/login", authControllers.login);
router.post("/register", authControllers.register);
router.get("/logout", authControllers.logout);
router.get("/refresh_token", authControllers.refreshToken);
router.get("/load_session", authControllers.loadSession);

export const authRoutes = router;
