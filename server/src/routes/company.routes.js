import { Router } from "express";
import { body } from "express-validator";
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";
import { validate } from "../middleware/validate.js";
import reviewRouter from "./review.routes.js";

const router = Router();

const companyValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2 })
    .withMessage("Company name must be at least 2 characters"),
  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 5 })
    .withMessage("Location must be at least 5 characters"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ min: 2 })
    .withMessage("City must be at least 2 characters"),
  body("foundedOn")
    .notEmpty()
    .withMessage("Founded date is required")
    .isISO8601()
    .withMessage("Founded date must be a valid date")
    .custom((value) => new Date(value).getTime() <= Date.now())
    .withMessage("Founded date cannot be in the future"),
];

router.get("/", getCompanies);
router.post("/", companyValidation, validate, createCompany);
router.get("/:id", getCompanyById);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);

// nested review routes: /api/companies/:id/reviews
router.use("/:id/reviews", reviewRouter);

export default router;
