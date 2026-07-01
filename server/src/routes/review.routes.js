import { Router } from "express";
import { body } from "express-validator";
import {
  getReviewsForCompany,
  createReview,
  likeReview,
} from "../controllers/review.controller.js";
import { validate } from "../middleware/validate.js";

// mergeParams so we can read :id (company id) from the parent router
const router = Router({ mergeParams: true });

const reviewValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters"),
  body("subject")
    .trim()
    .notEmpty()
    .withMessage("Subject is required")
    .isLength({ min: 3 })
    .withMessage("Subject must be at least 3 characters"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Review text is required")
    .isLength({ min: 10 })
    .withMessage("Review text must be at least 10 characters"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
];

router.get("/", getReviewsForCompany);
router.post("/", reviewValidation, validate, createReview);

export default router;
