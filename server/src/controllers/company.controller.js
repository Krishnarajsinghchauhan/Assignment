import mongoose from "mongoose";
import Company from "../models/Company.js";
import Review from "../models/Review.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const withRatingStats = () => [
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "company",
      as: "reviews",
    },
  },
  {
    $addFields: {
      reviewCount: { $size: "$reviews" },
      averageRating: {
        $cond: [
          { $eq: [{ $size: "$reviews" }, 0] },
          0,
          { $round: [{ $avg: "$reviews.rating" }, 1] },
        ],
      },
    },
  },
  { $project: { reviews: 0 } },
];

export const getCompanies = asyncHandler(async (req, res) => {
  const { search, city, sort } = req.query;

  const match = {};
  if (search) match.name = { $regex: escapeRegex(search), $options: "i" };
  if (city) match.city = { $regex: `^${escapeRegex(city)}$`, $options: "i" };

  const pipeline = [{ $match: match }, ...withRatingStats()];

  switch (sort) {
    case "average":
    case "rating":
      pipeline.push({ $sort: { averageRating: -1, name: 1 } });
      break;
    case "location":
      pipeline.push({ $sort: { city: 1, name: 1 } });
      break;
    case "name":
    default:
      pipeline.push({ $sort: { name: 1 } });
      break;
  }

  const companies = await Company.aggregate(pipeline);
  res.json({ success: true, data: companies });
});

export const getCompanyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(404, "Company not found");
  }

  const pipeline = [
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    ...withRatingStats(),
  ];

  const [company] = await Company.aggregate(pipeline);
  if (!company) throw new ApiError(404, "Company not found");

  res.json({ success: true, data: company });
});

export const createCompany = asyncHandler(async (req, res) => {
  const { name, location, city, foundedOn, logoUrl, description } = req.body;

  const existing = await Company.findOne({
    name: { $regex: `^${escapeRegex(name.trim())}$`, $options: "i" },
  });
  if (existing) {
    throw new ApiError(409, "A company with this name already exists");
  }

  const company = await Company.create({
    name,
    location,
    city,
    foundedOn,
    logoUrl,
    description,
  });

  res.status(201).json({
    success: true,
    data: { ...company.toObject(), averageRating: 0, reviewCount: 0 },
  });
});

export const updateCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const company = await Company.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!company) throw new ApiError(404, "Company not found");
  res.json({ success: true, data: company });
});

export const deleteCompany = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const company = await Company.findByIdAndDelete(id);
  if (!company) throw new ApiError(404, "Company not found");
  await Review.deleteMany({ company: id });
  res.json({ success: true, data: {} });
});
