import mongoose from "mongoose";

const user__schema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String },
    last_name: { type: String },
  },
  { timestamps: true }
);

user__schema.index({ username: 1 });

const User = new mongoose.model("user", user__schema);

export { User };
