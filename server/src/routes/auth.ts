import cookieParser from "cookie-parser";
import { Router } from "express";

import { authControllers } from "../controllers";
import { schemas, validate } from "../middlewares/validate";
import { protect } from "../middlewares/protect";

const router = Router();

router.post("/login", validate(schemas.login, "body"), authControllers.login);
router.post(
  "/register",
  validate(schemas.register, "body"),
  authControllers.register
);
router.get("/logout", authControllers.logout);
router.get("/refresh_token", cookieParser(), authControllers.refreshToken);
router.get("/load_session", protect, authControllers.loadSession);

export const authRoutes = router;
