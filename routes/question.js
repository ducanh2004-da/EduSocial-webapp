const express = require('express');
const router = express.Router();
const CatchAsync = require('../utils/CatchAsync');
const questionControl = require('../controllers/question');
router.route('/')
.get(CatchAsync(questionControl.index))
.post(CatchAsync(questionControl.createQuestion))

router.route('/create')
.get(questionControl.creationForm)


router.route('/:id/edit')
.get(CatchAsync(questionControl.viewEditQuestion));


router.route('/:id')
.get(questionControl.viewQuestion)
.delete(CatchAsync(questionControl.deleteQuestion))
.put(CatchAsync(questionControl.editQuestion));





module.exports = router