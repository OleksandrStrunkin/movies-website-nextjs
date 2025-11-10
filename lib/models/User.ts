import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    favorites: { type: [Number], default: [] },
    googleId: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // @ts-ignore
        delete ret._id;
        // @ts-ignore
        delete ret.__v;
        // @ts-ignore
        delete ret.googleId;
        // @ts-ignore
        delete ret.password;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        // @ts-ignore
        delete ret._id;
        // @ts-ignore
        delete ret.__v;
        // @ts-ignore
        delete ret.googleId;
        // @ts-ignore
        delete ret.password;
      },
    },
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
