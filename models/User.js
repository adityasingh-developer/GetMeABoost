import mongoose from "mongoose";
import { DEFAULT_PAGE_SECTIONS } from "@/lib/pageSections";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
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
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    },
    members: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          tier: {
            name: {
              type: String,
              required: true,
              trim: true,
            },
            price: {
              type: Number,
              required: true,
              min: 1,
            },
            description: {
              type: String,
              default: "",
              trim: true,
            },
          },
          joinedAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      default: [],
    },
    memberTiers: {
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true,
          },
          price: {
            type: Number,
            required: true,
            min: 1,
          },
          description: {
            type: String,
            default: "",
            trim: true,
          },
        },
      ],
      default: [
        {
          name: "Member",
          price: 9,
          description: "",
        },
        {
          name: "Pro Member",
          price: 15,
          description: "",
        },
        {
          name: "VIP Member",
          price: 21,
          description: "",
        }
      ],
    },
    links: {
      type: Object,
      default: {},
    },
    pageSections: {
      type: Object,
      default: () => ({ ...DEFAULT_PAGE_SECTIONS }),
    },

  },
  { timestamps: true }
);

UserSchema.pre("save", function syncTotalSupportAmount(next) {
  const supportersTotal = Array.isArray(this.supporters)
    ? this.supporters.reduce((sum, supporter) => sum + (Number(supporter?.amount) || 0), 0)
    : 0;
  const membersTotal = Array.isArray(this.members)
    ? this.members.reduce((sum, member) => sum + (Number(member?.tier?.price) || 0), 0)
    : 0;

  this.totalSupportAmount = supportersTotal + membersTotal;
  next();
});

const existingUserModel = mongoose.models.User;

if (existingUserModel && !existingUserModel.schema.path("links")) {
  existingUserModel.schema.add({
    links: {
      type: Object,
      default: {},
    },
  });
}

if (existingUserModel && !existingUserModel.schema.path("pageSections")) {
  existingUserModel.schema.add({
    pageSections: {
      type: Object,
      default: () => ({ ...DEFAULT_PAGE_SECTIONS }),
    },
  });
}

const User = existingUserModel || mongoose.model("User", UserSchema);

export default User;
