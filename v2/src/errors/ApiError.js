class ApiError extends Error {
    constructor(message, status){
        super(message);
        this.message = message;
        this.status = status;
    }
    static notFound(message){
        const error = {
            message: message || "Böyle bir kayıt bulunamadı!",
            status:404
        }
        return error;
    }
    static badRequest(){
        const error = {
            message:"Geçersiz istek!",
            status:400
        }
        return error;
    }
}

module.exports = ApiError;