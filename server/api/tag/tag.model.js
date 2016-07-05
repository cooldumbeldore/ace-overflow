'use strict';

import mongoose from 'mongoose';

var tagSchema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    }
  });

export default mongoose.model('Tag', tagSchema);