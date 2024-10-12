const mongoose = require('mongoose');
const Course = require('../models/course'); // Import the Course model
const sample = array => array[Math.floor(Math.random() * array.length)]; // Sample function

// Sample data for seeding
const courseTitles = ["Mastering Pastry", "Bread Baking Basics", "Advanced Cake Decoration"];
const courseDescriptions = [
  "Learn how to create delicious pastries from scratch.",
  "A step-by-step guide to baking the perfect loaf of bread.",
  "Advanced techniques for creating stunning cakes."
];
const lessonTitles = ["Introduction", "Ingredients & Tools", "Baking Techniques", "Final Projects"];
const videoUrls = [
  "https://example.com/intro.mp4",
  "https://example.com/tools.mp4",
  "https://example.com/techniques.mp4",
  "https://example.com/finalproject.mp4"
];
const resources = [
  ["Recipe book", "Shopping list"],
  ["Baking tool checklist", "Ingredient sourcing guide"],
  ["Instruction manual", "Online forum"],
  []
];
async function main() {
    await mongoose.connect('mongodb://localhost:27017/eduSocial');
  }
  main().then(() =>{
      console.log("Database connect")
  })
  main().catch((e) =>{
      console.log("Error");
      console.log(e);
  })

async function seedDB() {
  await Course.deleteMany({});
  for (let i = 0; i < 10; i++) { // Create 10 sample courses
    const course = new Course({
      title: sample(courseTitles),
      description: sample(courseDescriptions),
      coursethumbnail: 'https://f.howkteam.vn/Upload/cke/images/1_LOGO%20SHOW%20WEB/7_JavaScript/Javascript%20c%C6%A1%20ba%CC%89n/00_%20Javascript%20basic_Kteam.png', // Placeholder thumbnail
      lessons: [
        {
          lessonTitle: sample(lessonTitles),
          content: "This is a detailed lesson description.",
          resources: sample(resources),
          videourl: sample(videoUrls)
        },
        {
          lessonTitle: sample(lessonTitles),
          content: "This is another detailed lesson description.",
          resources: sample(resources),
          videourl: sample(videoUrls)
        }
      ],
      tags: [], // Assuming tags will be added later or use sample data
      studentsEnrolled: [], // Students to be added later
      studentCount: 0 // Initially set to zero
    });

    await course.save(); // Save each course to the database
  }

  console.log("Database seeded with courses!");
}

seedDB().then(() => {
  mongoose.connection.close(); // Close the database connection after seeding
});
