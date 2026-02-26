"use server"

import mongoose from 'mongoose';
import { Course, Conversation } from '@/lib/db/schema';

// Helper to ensure DB connection (Abstract this in production)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export type GroupedConversations = {
  private: any[];
  academic: {
    courseId: string;
    courseName: string;
    courseCode: string;
    conversations: any[];
  }[];
};

export async function getSidebarData(userId: string): Promise<GroupedConversations> {
  await connectDB();

  // 1. Fetch all conversations for user, SORTED chronologically (most recent first)
  const conversations = await Conversation.find({ userId })
    .sort({ updatedAt: -1 })
    .lean();

  // 2. Fetch all courses for the user
  const courses = await Course.find({ userId }).lean();

  // 3. Group the data
  const privateChats = conversations.filter(c => c.category === 'PRIVATE');
  const academicChats = conversations.filter(c => c.category === 'ACADEMIC');

  const academicGrouped = courses.map(course => ({
    courseId: course._id.toString(),
    courseName: course.name,
    courseCode: course.code,
    conversations: academicChats.filter(c => c.courseId?.toString() === course._id.toString())
  }));

  // Clean up ObjectIds for serialization to Client Components
  return JSON.parse(JSON.stringify({
    private: privateChats,
    academic: academicGrouped
  }));
}