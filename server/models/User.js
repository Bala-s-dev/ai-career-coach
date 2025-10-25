import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    authProviderId: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      required: true, 
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
      type: String, 
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema);

export default User;
