const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly extract Schema

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    // instructorId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User'
    // },
    coursethumbnail: {
      type: String,
    },
    lessons: [
      {
        lessonTitle: {
          type: String,
          required: true
        },
        content: {
          type: String,
          required: true
        },
        resources: [String],
        videourl: {
          type: String,
        }
      }
    ],
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    studentsEnrolled: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    studentCount: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
