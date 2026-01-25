import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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
            index: true,
        },

        provider: {
            type: String,
            required: true,
            enum: ["google"],
        },

        providerId: {
            type: String,
            required: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.index({provider: 1, providerId: 1}, {unique: true});

export default mongoose.model("User", userSchema);