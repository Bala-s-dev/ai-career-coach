import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    improvements: [
      {
        category: String,
        priority: String,
        before: String,
        after: String,
        rationale: String,
      },
    ],
    keywordGaps: [String],
    isTargetedAnalysis: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model('Analysis', AnalysisSchema);
export default Analysis;
