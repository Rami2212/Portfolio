import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, enum: ["se", "devops", "aiml", "other"] },

    shortDescription: { type: String, required: true },
    longDescription: { type: String, default: "" },

    tags: [{ type: String, trim: true }],

    coverImage: { type: String, default: "" },
    galleryImages: [{ type: String }],

    techStack: [{ type: String, trim: true }],

    liveUrl: { type: String, default: "" },
    demoUrl: { type: String, default: "" },

    isFeatured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Project = InferSchemaType<typeof ProjectSchema>;

export const ProjectModel: Model<Project> =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
