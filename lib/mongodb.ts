import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
  {
    id: String,
    member: {
      type: String,
      enum: ['Suraj', 'Harsh', 'Twinkle'],
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      enum: ['frontend', 'backend', 'qa'],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema)
export const User = mongoose.models.User || mongoose.model('User', UserSchema)
