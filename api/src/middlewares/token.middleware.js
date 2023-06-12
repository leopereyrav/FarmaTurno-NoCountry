const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const {handleHttpError} = require('../utils/handleError');


const verificateToken = (req, res, next) => {
    dotenv.config();
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = req.headers['authorization'];

    if (!token) {
        handleHttpError(res, "Forbidden", 403, "verificateToken");
        return;
    }

    jwt.verify(token, secretKey, (error) => {
        if (error) {
            handleHttpError(res, "Unauthorized", 401, "verificateToken");
            return;
        }

        next();
    });
};

module.exports = verificateToken;