const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    /*authorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: True
    },*/
    tags: [{
      type: String
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }
    ],
    upvotes: {
      type: Number,
      default: 0
    },
    downvotes: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    views : {
        type: Number,
        default: 0
    }
},
    {timestamps: true}
);
  
module.exports = mongoose.model('Question', questionSchema)