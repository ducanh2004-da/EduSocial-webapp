const mongoose = require('mongoose');
const Question = require('../models/question'); // Import the Question model
const sample = array => array[Math.floor(Math.random() * array.length)]; // Sample function

// Sample data for seeding
const questionTitles = [
  "What are the best practices for baking a cake?",
  "How do I achieve a flaky pie crust?",
  "What ingredients are essential for bread making?",
  "Can I substitute baking soda for baking powder?",
  "How do I properly store baked goods?"
];
const questionBodies = [
  "I'm looking for some tips and tricks to bake a perfect cake. Any suggestions?",
  "I struggle with making a pie crust that isn't tough. What can I do to improve it?",
  "I'm new to bread making. What ingredients should I always have on hand?",
  "I've heard mixed opinions about substituting baking soda and baking powder. Can someone clarify?",
  "What is the best way to keep my cookies fresh after baking?"
];
const tags = ["Baking", "Cakes", "Bread", "Pastry", "Storage"];

// Connect to MongoDB
async function main() {
    await mongoose.connect('mongodb://localhost:27017/eduSocial');
}
main().then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log("Error");
    console.log(e);
});

// Function to seed the database with questions
async function seedQuestions() {
    await Question.deleteMany({});
    for (let i = 0; i < 10; i++) { // Create 10 sample questions
        const question = new Question({
            title: sample(questionTitles),
            body: sample(questionBodies),
            tags: [sample(tags), sample(tags)], // Sample two tags for each question
            comments: [], // Assuming comments will be added later
            upvotes: 0, // Initially set to zero
            downvotes: 0, // Initially set to zero
            isPublished: true, // Marking as published for seeding
            views: 0
        });

        await question.save(); // Save each question to the database
    }

    console.log("Database seeded with questions!");
}

seedQuestions().then(() => {
    mongoose.connection.close(); // Close the database connection after seeding
});
