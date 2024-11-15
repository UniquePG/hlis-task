import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    gender: { type: String, enum: ["male", "female"], required: true,},
    place: { type: String, required: true, },
    role: { type: Number, required: true },
    password: { type: String, required: true, },
    signupMethod: { type: String, enum: ["facebook", "google", "manual"], default: "manual" },
});

    // const User = mongoose.model("User", userSchema);

export default mongoose.models.User || mongoose.model("User", userSchema);