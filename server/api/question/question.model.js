'use strict';

import mongoose from 'mongoose';

var QuestionSchema = new mongoose.Schema({
  title: String,
  text: String,
  code: String
});

export default mongoose.model('Question', QuestionSchema);
