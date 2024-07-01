import mongoose from "mongoose";
import validator from "validator";
const userSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"],
    },
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: [true, "Email already exists"],
        validate: [validator.default.isEmail, "Please enter valid email"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    gender: {
        type: String,
        enum: ["female", "male"],
        required: [true, "Please enter gender"],
    },
    dob: {
        type: Date,
        required: [true, "Please enter your date of birth"],
    },
}, {
    timestamps: true,
});
userSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    if (today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getDate() && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});
const User = mongoose.model("User", userSchema);
export default User;
