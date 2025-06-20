const jwt = require('jwt-simple');
const moment = require('moment');
const { secret } = require('../services/jwt');

exports.auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'Authorization header is missing' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');
    
    try {
        const payload = jwt.decode(token, secret);
        
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({ message: 'Token has expired' });
        }
        
        req.user = payload;
        next();
    } catch (error) {
        return res.status(404).send({ message: 'Invalid token' });
    }
};