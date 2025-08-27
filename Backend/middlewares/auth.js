import jwt from "jsonwebtoken";
import fs from "fs";
const auth = async (req, res, next) => {
    const publicKey = fs.readFileSync("./.cert/jwt.key.pub", "utf8");
    // Vérification de la clé API
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    try {
    const decodedToken = await jwt.verify(token, publicKey, { expiresIn: '1d', algorithms: ['RS256'] });
        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid token response" });
        }
        req.user = decodedToken; // tout le payload dispo ici
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        }
        return res.status(401).json({ error: "Invalid token" });
    }
};

export default auth;
