const express = require('express');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');
const courseControl = require('../controllers/course');
router.route('/')
.get(CatchAsync(courseControl.index))



module.exports = router