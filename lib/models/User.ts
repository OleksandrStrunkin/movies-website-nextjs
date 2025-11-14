import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    favorites: { type: [Number], default: [] },
    googleId: { type: String },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // @ts-expect-error: TS error due to temporary type mismatch
        delete ret._id;
        // @ts-expect-error: TS error due to temporary type mismatch
        delete ret.__v;
        delete ret.googleId;
        delete ret.password;
      },
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        // @ts-expect-error: TS error due to temporary type mismatch
        delete ret._id;
        // @ts-expect-error: TS error due to temporary type mismatch
        delete ret.__v;
        delete ret.googleId;
        delete ret.password;
      },
    },
  }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
