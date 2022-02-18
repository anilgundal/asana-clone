const BaseService = require("./BaseService");
const BaseModel = require("../models/Users");

class User extends BaseService {
    constructor(){
        super(BaseModel);
    }
}

module.exports = new User();