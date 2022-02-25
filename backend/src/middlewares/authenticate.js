const httpStatus = require('http-status');
const JWT = require('jsonwebtoken');

// Access Token'lar çalıştıktan sonra burası başlıyor.
const authenticateToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1] || null; // 1. boşluktan sonra ayır.
    if(token === null) return res.status(httpStatus.UNAUTHORIZED).send({message: "Önce giriş yapmalısınız!"});
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, usr) => {
        if(err) return res.status(httpStatus.FORBIDDEN).send({message: "Bu sayfa gizlidir!"});
        req.user = usr?._doc;
        delete req.user.password; delete req.user.createdAt; delete req.user.updatedAt;
        next();
    });
};

module.exports = authenticateToken;