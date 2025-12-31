import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    text: { type: String, required: true, trim: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export type Review = InferSchemaType<typeof ReviewSchema>;

export const ReviewModel: Model<Review> =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
