import jwt from "jsonwebtoken";
export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Missing authorization header" });
    }
    const token = header.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET ?? "dev-secret");
        req.user = payload;
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
export const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        return next();
    };
};
