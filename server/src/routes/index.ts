import { Router } from "express";

import { authRoutes } from "./auth";
import { postRoutes } from "./posts";

const router = Router();

router.use("/auth", authRoutes);
router.use("/posts", postRoutes);

export const apiRoutes = router;
