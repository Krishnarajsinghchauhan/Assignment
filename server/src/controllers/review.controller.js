import mongoose from "mongoose";
import Review from "../models/Review.js";
import Company from "../models/Company.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";

export const getReviewsForCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { sort } = req.query;

  let sortStage = { createdAt: -1 };
  if (sort === "rating") sortStage = { rating: -1, createdAt: -1 };
  else if (sort === "relevance") sortStage = { likes: -1, createdAt: -1 };
  else if (sort === "date") sortStage = { createdAt: -1 };

  const reviews = await Review.find({ company: id }).sort(sortStage);
  res.json({ success: true, data: reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const company = await Company.findById(id);
  if (!company) throw new ApiError(404, "Company not found");

  const { fullName, subject, text, rating, avatarUrl } = req.body;

  const review = await Review.create({
    company: id,
    fullName,
    subject,
    text,
    rating,
    avatarUrl,
  });

  res.status(201).json({ success: true, data: review });
});

export const likeReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(404, "Review not found");
  }

  const review = await Review.findByIdAndUpdate(
    reviewId,
    { $inc: { likes: 1 } },
    { new: true }
  );
  if (!review) throw new ApiError(404, "Review not found");

  res.json({ success: true, data: review });
});
