import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const SiteSchema = new Schema(
  {
    item: { type: String, required: true, trim: true },
    value: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export type Site = InferSchemaType<typeof SiteSchema>;

export const SiteModel: Model<Site> =
  mongoose.models.Site || mongoose.model("Site", SiteSchema);