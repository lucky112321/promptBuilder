import mongoose from 'mongoose';

const purchasedPackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    purchaseDate: { type: Date, default: Date.now },
    credits: { type: Number, default: 0 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'yearly'],
      default: 'free'
    },
    planExpiry: { type: Date, default: null },
    promptsUsedToday: { type: Number, default: 0 },
    promptsResetAt: { type: Date, default: Date.now },
    purchasedPacks: { type: [purchasedPackSchema], default: [] }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const User = mongoose.model('User', userSchema);

export default User;
