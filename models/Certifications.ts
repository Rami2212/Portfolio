import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const CertificationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    organizationUrl: { type: String, required: true, trim: true },
    issuedDate: { type: String, required: true, trim: true },
    credentialUrl: { type: String, default: "", trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type Certification = InferSchemaType<typeof CertificationSchema>;

export const CertificationModel: Model<Certification> =
  mongoose.models.Certification ||
  mongoose.model("Certification", CertificationSchema);
