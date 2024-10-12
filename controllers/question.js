const Question = require('../models/question')
const topic = {
    title: 'Hỏi đáp',
    description: 'Chia sẻ kiến thức, cùng nhau phát triển',
    find: 'câu hỏi'
}
module.exports.index = async (req,res) => {
    const questions = await Question.find({isPublished: true});
    res.render('questions/index',{topic,questions});
}

module.exports.creationForm = (req,res) => {
    res.render('questions/create', {topic});
}

module.exports.createQuestion = async (req, res) => {
    // Split tags by spaces and store them in an array
    const tagsArray = req.body.question.tags.split(' ').filter(tag => tag.trim() !== '');
    const newQuestion = new Question({
        ...req.body.question,
        tags: tagsArray // Assign the tags array to the tags field
    });
    await newQuestion.save();
    res.redirect(`/user/questions/${newQuestion._id}`);
};
module.exports.viewEditQuestion = async (req,res) => {
    const question = await Question.findById(req.params.id);
    res.render('questions/edit', {topic,question});
}
//Not completely done
module.exports.viewQuestion = async (req,res) => {
    const question = await Question.findById(req.params.id);
    question.views += 1;
    await question.save();
    res.render('questions/show', {topic,question});
}

 module.exports.editQuestion = async (req, res) => {
        const { id } = req.params; 
        const updatedData = req.body.question; 
        if (updatedData.tags) {
            updatedData.tags = updatedData.tags.split(' ').filter(tag => tag.trim() !== '');
        }
        const question = await Question.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!question) {
            return res.status(404).send('Question not found');
        }
        res.redirect(`/user/questions/${id}`);
};
    



module.exports.deleteQuestion = async (req,res) => {
    await Question.findByIdAndDelete({_id : req.params.id})
    res.redirect('/user/questions');
}