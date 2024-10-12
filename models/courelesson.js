const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Correctly extract Schema


courseLessonSchema = Schema(
    {
    courseBelonged: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }
    }
)