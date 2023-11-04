import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
      required: false,
      min: 2,
      max: 50,
    },
    adType: {
      type: String,
      required: true,
    },
    email: String,
    phone: String,
    available: {
      type: Boolean,
      default: false,
    },
    complete: {
      type: Boolean,
      default: false,
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
    jobType: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    salary: String,
    jobSite: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
  },
  {
    timeStamps: true,
  }
);

const RentalSchema = new mongoose.Schema(
  {
    ad: { type: mongoose.Schema.Types.ObjectId, ref: "Ad" },
    bedRoom: {
      type: Number,
      required: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    washRoom: {
      type: Number,
      required: true,
    },
    rentalType: {
      type: String,
      enum: ['Condo', 'Apartment', 'House', 'Town House', 'Basement'],
      requierd: true,
    },
    isOwner: {
      type: Boolean,
      default: false
    },
  },
  {
    timeStamps: true,
  }
);

const Ad = mongoose.model("Ad", AdSchema);
export const Job = mongoose.model("Job", JobSchema);
export const Rental = mongoose.model("Rental", RentalSchema);
export default Ad;
