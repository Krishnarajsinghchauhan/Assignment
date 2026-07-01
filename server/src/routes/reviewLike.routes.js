import { Router } from "express";
import { likeReview } from "../controllers/review.controller.js";
import { protect } from "../middleware/auth.js";

const router = Router();

router.patch("/:reviewId/like", protect, likeReview);

export default router;
