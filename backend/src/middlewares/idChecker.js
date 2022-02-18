const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');
const idChecker = (req, res, next) => {
    if(!req?.params?.id?.match(/^[0-9a-fA-F]{24}$/)){
        next(new ApiError("Geçersiz id", httpStatus.BAD_REQUEST));
        return;
    }
    next();
}

module.exports = idChecker;
