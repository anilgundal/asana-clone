const Mongoose = require('mongoose');
const logger = require("../scripts/logger/Users");

const UserSchema = new Mongoose.Schema({
    fullname: String,
    password: String,
    email: String,
    picture: String
}, {timestamps:true, versionKey:false });

UserSchema.pre("save", (next) => {
    next();
});

UserSchema.post("save", (doc) => {
    logger.log({
        level: "info",
        message : doc
    });
});

module.exports = Mongoose.model('User', UserSchema);