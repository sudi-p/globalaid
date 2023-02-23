import User from '../models/User.js';
import Job from '../models/Job.js';

export const getUser = async(req, res) => {
    try{
        const user = await User.findOne({id: req.user.id})
        const { firstName, lastName, email} = user;
        res.status(201).json({ firstName, lastName, email})
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}

export const createJob = async(req,res) => {
    try{
        const {
            title,
            description,
            company,
            location,
            email,
            phone,
            isOwner
        } = req.body
        const job = new Job({
            userId: req.user.id,
            title,
            description,
            company,
            location,
            email,
            phone,
            isOwner
        })
        await job.save()
        const jobs = await Job.find()
        res.status(201).json({jobs})
    } catch (err){
        res.status(500).json({'message': err.message})
    }
}

export const getJobs = async(req,res) => {
    try{
        const jobs = await Job.find()
        res.status(201).json({jobs})
    } catch (err){
        res.status(500).json({'message': err.message})
    }
}