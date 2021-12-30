const { string } = require("joi");

class ApiError extends Error {
    constructor(message, status){
        super(message);
        this.message = message;
        this.status = status;
    }
    static notFound(){
        const error = {
            message: "Böyle bir kayıt bulunamadı!",
            status:404
        }
        return error;
    }
    static badRequest(){
        const error = {
            message:"Geçersiz istek!"
        }
        return error;
    }
}

module.exports = ApiError;