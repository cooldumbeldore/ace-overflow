
import mongoose from 'mongoose';
var answerSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  });

export default answerSchema;