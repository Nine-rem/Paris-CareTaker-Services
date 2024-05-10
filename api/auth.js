const jwt = require('jsonwebtoken');
const secretKey = 'pa2024';

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header manquant' });
        }

        const token = authHeader.split(' ')[1];
        

        const decodedToken = jwt.verify(token, secretKey);

 
        req.auth = {
            userId: decodedToken.userId
        };


        next();
    } catch (error) {

        res.status(401).json({ message: 'token invalide ou expiré', error });
    }
};
