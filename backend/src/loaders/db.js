const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once("open", () => {
    console.log("DB bağlantısı sağlandı.");
});

const connectDB = async () => {
    Mongoose.set('strictQuery', false);

    try {
        await Mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB bağlantısı başarıyla gerçekleştirildi.');
    } catch (error) {
        console.error('MongoDB bağlantısı sırasında bir hata oluştu:', error);
    }
}

module.exports = {
    connectDB
}