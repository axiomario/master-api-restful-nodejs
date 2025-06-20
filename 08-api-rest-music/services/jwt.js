const jwt = require('jwt-simple');
const moment = require('moment');

const secret = 'my_secret_key';

const createToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix() // Token valid for 30 days
    };

    return jwt.encode(payload, secret);
};

module.exports = {
    secret,
    createToken
};