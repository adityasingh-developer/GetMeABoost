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
      required: false,
      default: null,
    },
    profileImage: {
      type: String,
      default: null,
      trim: true,
    },
    bannerImage: {
      type: String,
      default: null,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
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
    supporterCount: {
      type: Number,
      default: 0,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    membersCount: {
      type: Number,
      default: 0,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
