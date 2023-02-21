import User from '../models/User.js';

export const getUser = async(req, res) => {
    try{
        const user = await User.findOne({id: req.user.id})
        const { firstName, lastName, email} = user;
        res.status(201).json({ firstName, lastName, email})
    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}