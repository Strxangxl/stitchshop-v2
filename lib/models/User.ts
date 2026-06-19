import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserDocument extends Document {
  name: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

// Method attached to the user model to compare input passwords with hashed database strings
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password || "");
};

// Middleware hook that hashes the password automatically before saving a new document
// Middleware hook that hashes the password automatically before saving a new document
userSchema.pre("save", async function () {
  // If the password field hasn't been touched or updated, exit the operation early
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password || "", salt);
});

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);

export default User;
