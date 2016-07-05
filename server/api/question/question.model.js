'use strict';

import mongoose from 'mongoose';
import answerSchema from '../answer/answer.model'

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
  postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  answers : [answerSchema],
  tags: [{type:mongoose.Schema.Types.ObjectId, ref:'Tag'}]
},
{
  timestamps: true
});

export default mongoose.model('Question', QuestionSchema);
