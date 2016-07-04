'use strict';

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

var QuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: false
  },
  prog_lang:{
    type: String,
    required: false
  },
  answers : [answerSchema]
},
{
  timestamps: true
});

export default mongoose.model('Question', QuestionSchema);
