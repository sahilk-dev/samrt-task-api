import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
            index: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            refs: "User",
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", taskSchema);