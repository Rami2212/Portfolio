import mongoose, { Schema, InferSchemaType, Model } from "mongoose";


const SkillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["se", "devops", "aiml", "other"],
    },
    iconUrl: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);


export type Skill = InferSchemaType<typeof SkillSchema>;


export const SkillModel: Model<Skill> =
  mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
