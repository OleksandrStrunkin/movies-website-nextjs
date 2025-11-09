import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // не required
  favorites: { type: [Number], default: [] },
  googleId: { type: String }, // опційно
});

export default mongoose.models.User || mongoose.model("User", userSchema);
