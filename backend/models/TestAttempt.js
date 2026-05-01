import mongoose from 'mongoose';

const responseSchema = mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  selectedOptionIndex: { type: Number }, // If null/undefined, it means unattempted
  timeSpent: { type: Number, default: 0 }, // Time spent on this specific question in seconds
  isCorrect: { type: Boolean }, // Can be calculated at submission
  isMarkedForReview: { type: Boolean, default: false }
});

const testAttemptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
    score: {
      type: Number,
      required: true,
      default: 0
    },
    totalTimeTaken: {
      type: Number, // In seconds
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'completed'],
      default: 'in-progress'
    },
    responses: [responseSchema],
    accuracy: { type: Number, default: 0 },
    rank: { type: Number }, // To be calculated periodically or dynamically
  },
  {
    timestamps: true,
  }
);

const TestAttempt = mongoose.model('TestAttempt', testAttemptSchema);

export default TestAttempt;
