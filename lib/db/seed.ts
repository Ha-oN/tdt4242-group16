import mongoose from 'mongoose';
import { User, Course, Conversation } from './schema';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai-guidebook';

export async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB. Clearing old data...');
    
    await Promise.all([
      User.deleteMany({}),
      Course.deleteMany({}),
      Conversation.deleteMany({}),
    ]);

    // Create User
    const user = await User.create({ name: 'Jane Doe', email: 'jane.doe@university.edu' });

    // Create Courses
    const course1 = await Course.create({ name: 'Ethics in AI', code: 'CS401', userId: user._id });
    const course2 = await Course.create({ name: 'Data Structures', code: 'CS201', userId: user._id });

    // Create Conversations with specific updatedAt times to test sorting
    const now = new Date();
    
    await Conversation.insertMany([
      {
        title: 'Understanding Utilitarianism',
        category: 'ACADEMIC',
        userId: user._id,
        courseId: course1._id,
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        title: 'Binary Tree Traversal',
        category: 'ACADEMIC',
        userId: user._id,
        courseId: course2._id,
        updatedAt: now, // Most recent
      },
      {
        title: 'Dinner Recipes',
        category: 'PRIVATE',
        userId: user._id,
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        title: 'Gym Workout Plan',
        category: 'PRIVATE',
        userId: user._id,
        updatedAt: new Date(now.getTime() - 1000 * 60 * 30), // 30 mins ago
      }
    ]);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();