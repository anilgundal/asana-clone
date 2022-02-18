const Mongoose = require('mongoose');

const db = Mongoose.connection;

db.once("open", () => {
    console.log("DB bağlantısı sağlandı.");
});

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const connectDB = async () => {
    await Mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`, {
    useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = {
    connectDB
}