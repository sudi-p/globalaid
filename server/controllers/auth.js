import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register User

export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            location,
            phone,
        } = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const user = await User.findOne({ email: email});
        if (user) return res.status(400).json({msg: "User already exists"});
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            location,
            phone,
        })
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message});
    }
}

//Logging in
export const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) return res.status(400).json({msg: "User doesn't exist"});
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({msg: "Oops! Password wrong"})
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        console.log(user)
        delete user.password;
        res.status(200).json({token, user});
    } catch(err){
        res.status(500).json({error: err.message});
    }
}