import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    signupRecaptcha: {
      verified: {
        type: Boolean,
        default: false,
      },
      score: {
        type: Number,
        default: null,
      },
      action: {
        type: String,
        default: null,
      },
      hostname: {
        type: String,
        default: null,
      },
      verifiedAt: {
        type: Date,
        default: null,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
