import mongoose, { Schema, Document, Types } from 'mongoose';

// --- Types ---
export interface IUser extends Document {
  name: string;
  email: string;
}

export interface ICourse extends Document {
  name: string;
  code: string;
  userId: Types.ObjectId;
}

export interface IConversation extends Document {
  title: string;
  category: 'ACADEMIC' | 'PRIVATE';
  userId: Types.ObjectId;
  courseId?: Types.ObjectId; // Only required if category is ACADEMIC
  updatedAt: Date;
  createdAt: Date;
}

export interface IMessage extends Document {
  conversationId: Types.ObjectId;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

// --- Schemas ---
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const CourseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  code: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const ConversationSchema = new Schema<IConversation>({
  title: { type: String, required: true, default: 'New Conversation' },
  category: { type: String, enum: ['ACADEMIC', 'PRIVATE'], required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course' },
}, { timestamps: true }); // Automatically manages createdAt and updatedAt

const MessageSchema = new Schema<IMessage>({
  conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

// --- Models ---
export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const Course = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
export const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);
export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);