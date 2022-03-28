const Mongoose = require('mongoose');
const logger = require("../scripts/logger/Users");

const UserSchema = new Mongoose.Schema({
    avatar: String,
    name: String,
    surname: String,
    company: String,
    contactPhone: String,
    companySite: String,
    country: String,
    language: String,
    timezone: String,
    currency: String,
    communication: [String],
    allowmarketing: Boolean,
    password: String,
    email: String,
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

module.exports = Mongoose.model('user', UserSchema);