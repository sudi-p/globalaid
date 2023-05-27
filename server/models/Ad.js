import mongoose from "mongoose";

const AdSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
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
  },
  {
    timeStamps: true,
  }
);
AdSchema.methods.isComplete = async function() {
  try{
    const adType = this.adType;
    if (adType == "rent"){
      const rents = await Rental.find({ad: this._id});
      return rents.length>0
    } else {
      const jobs = await Job.find({ad: this._id})
      return jobs.length>0
    }
  } catch(err){
    console.log(err)
  }
  
}

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
export const Rental = mongoose.model("Rental", RentalSchema);
export default Ad;
