import mongoose from 'mongoose';

const questionSchema = mongoose.Schema({
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  marks: { type: Number, required: true, default: 4 },
  negativeMarks: { type: Number, required: true, default: 1 },
  subject: { type: String, enum: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General'], default: 'General' }
});

const testSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    totalMarks: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'JEE Main', 'NEET'
    questions: [questionSchema],
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model('Test', testSchema);

export default Test;
