import mongoose from 'mongoose';

const InstitutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    email: { type: String },
    contactPhone: { type: String },
    address: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Institution', InstitutionSchema);


