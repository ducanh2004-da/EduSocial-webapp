const Course = require('../models/course')
const topic = {
    title: 'Tất cả khóa học',
    description: 'Hàng trăm khóa học miễn phí được xây dựng bởi EduSocial và cộng đồng!',
    find: 'câu khóa học'

}
module.exports.index = async (req,res) => {
    const courses = await Course.find({});
    res.render('courses/index',{topic,courses})
}