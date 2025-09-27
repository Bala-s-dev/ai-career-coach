// server/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    // We'll use the ID from Google/LinkedIn as the primary identifier
    authProviderId: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      required: true, // e.g., 'google', 'linkedin'
    },
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String, // URL to profile picture
    },
    // We'll add skills, experience, etc. here later
    // skills: [String],
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

export default User;
