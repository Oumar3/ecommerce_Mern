const VALID_API_KEYS = [
    process.env.API_KEY_WEB,    // exemple : clé pour ton frontend React
    process.env.API_KEY_MOBILE // exemple : clé pour React Native
];


const authApiKey = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Api-Key ")) {
        return res.status(401).json({ error: "API key missing or invalid" });
    }

    const apiKey = authHeader.split(" ")[1];
    if (!VALID_API_KEYS.includes(apiKey)) {
        return res.status(403).json({ error: "Forbidden: Invalid API key" });
    }

    req.clientKey = apiKey;
    next();
};

export default authApiKey;
