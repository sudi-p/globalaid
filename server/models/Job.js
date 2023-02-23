import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        description: {
            type: String,
            required: true,
            min: 2,
            max: 1000
        },
        company: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        location: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        email: String,
        phone: String,
        isOwner: {
            type: Boolean,
            default: false,
        },
        available: {
            type: Boolean,
            default: true,
        }
    }, {
        timeStamps: true,
    }
)
const Job = mongoose.model("Job", JobSchema);
export default Job;