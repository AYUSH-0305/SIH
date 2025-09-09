import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', index: true, required: true },
    Rno: { type: String, required: true, index: true },
    Jno: { type: String, required: true, index: true },
    CN: { type: String, required: true, index: true },
    B: { type: String, required: true },
    Sec: { type: String, required: true }
  },
  { timestamps: true }
);

StudentSchema.index({ institution: 1, Rno: 1 }, { unique: true });

export default mongoose.model('Student', StudentSchema);


