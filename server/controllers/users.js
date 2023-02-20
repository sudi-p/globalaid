import User from '../models/User.js';

export const getUser = async(req, res) => {
    try{

    } catch(err) {
        res.status(500).json({'message': err.message})
    }
}