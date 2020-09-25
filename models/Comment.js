import mongoose, { mongo } from "mongoose";

const CommnetSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
})

const model = mongoose.model("Comment", CommnetSchema);

export default model;