const mongoose = require('mongoose');

const { Schema } = mongoose;

const issueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sharedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sharedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
);

issueSchema.set('toObject', {
  transform(doc, ret) {
    const object = ret;
    delete object.__v;
    return object;
  },
});


issueSchema.set('toJSON', {
  transform(doc, ret) {
    const object = ret;
    delete object.__v;
    return object;
  },
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
