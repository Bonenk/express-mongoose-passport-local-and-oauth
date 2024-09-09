import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    sparse: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true
  },
  // Add other OAuth provider IDs as needed
  // discordId: { type: String, unique: true, sparse: true },
  // facebookId: { type: String, unique: true, sparse: true },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);