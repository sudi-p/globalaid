import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register User
export const register = async (req, res) => {
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
        const user = await User.findOne({ email: email });
        if (user) return res.status(409).json({ msg: "User already exists" });
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
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

//Logging in
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ msg: 'Username and password are required.' });

        const user = await User.findOne({ email: email })
        if (!user) return res.status(401).json({ msg: "User doesn't exist" });

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ msg: "Oops! Password wrong" })

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15s'}
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '5d' }
        );
        // Saving refreshToken
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 5* 24 *60 *60 * 1000,
            path: "/"
        })
        res.status(200).json({ accessToken, user: {email: email} });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const refresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) return res.sendStatus(401);
    const refreshToken = cookies.refreshToken;
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser._id.toString() !== decoded.userId) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { userId: foundUser._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '3000s' }
            );
            res.json({ accessToken, user: {email: foundUser.email} })
        }
    );
}

export const logout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}