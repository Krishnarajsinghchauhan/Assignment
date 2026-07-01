import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, index: true },
    fullName: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    avatarUrl: { type: String, default: "" },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
