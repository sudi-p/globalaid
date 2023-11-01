import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).json({ msg: "Access Denied" });
        }
        token = token.split(' ')[1];
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403);
                req.user = decoded.userId;
                next();
            }
        );
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

export const checkIfAuthenticated = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            req.isAuthenticated = false;
            next();
        } else {
            token = token.split(' ')[1];
            jwt.verify(
                token,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) return res.sendStatus(403);
                    req.user = decoded.userId;
                    req.isAuthenticated = true;
                    next();
                }
            );
        }
    } catch (err) {
        res.sendStatus(500)
    }
}