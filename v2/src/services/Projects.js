const BaseService = require("./BaseService");
const BaseModel = require("../models/Projects");

class Projects extends BaseService {
    constructor(){
        super(BaseModel);
    }
    index(where){
        return BaseModel.find(where || {}).populate(
            {path: "user_id", select: "fullname email picture"}
        );
    };
}

module.exports = Projects;