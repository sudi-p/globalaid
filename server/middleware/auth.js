import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.accessToken) return res.sendStatus(403);
        const accessToken = cookies.accessToken;
        jwt.verify(
            accessToken,
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
        const cookies = req.cookies;
        if (!cookies?.accessToken){
            req.isAuthenticated = false;
            next();
        } else {
            const accessToken = cookies.accessToken;
            jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET,
                (err, decoded) => {
                    if (err) {
                        req.isAuthenticated = false;
                    } else {
                        req.user = decoded.userId;
                        req.isAuthenticated = true;
                    }
                    next();
                }
            );
        }
    } catch (err) {
    res.sendStatus(500)
}
}