import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    userId: {
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
      max: 1000,
    },
    location: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: String,
    phone: String,
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timeStamps: true,
  }
);
const JobSchema = new mongoose.Schema(
  {
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad" },
    company: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timeStamps: true,
  }
);

const RentalSchema = new mongoose.Schema(
  {
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad" },
    company: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    isOwner: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Ad = mongoose.model("Ad", AdSchema);
export const Job = mongoose.model("Job", JobSchema);
export default Ad;
