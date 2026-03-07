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
    supporters: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
          },
          message: {
            type: String,
            default: "",
            trim: true,
          },
          amount: {
            type: Number,
            required: true,
            min: 1,
          },
          supportedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    membersCount: {
      type: Number,
      default: 0,
    },
    followers: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    totalSupportAmount: {
      type: Number,
      default: 0,
    },
    pendingPayout: {
      type: Number,
      default: 0,
    },
    totalPayout: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
