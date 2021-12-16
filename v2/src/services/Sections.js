const BaseService = require("./BaseService");
const BaseModel = require("../models/Sections");

class Sections extends BaseService {
    constructor(){
        super(BaseModel);
    }
    index(where){
        return BaseModel.find(where || {}).populate([
            {path: "user_id", select: "fullname email picture"},
            {path: "project_id", select: "name"}
        ]);
    }; 
}

module.exports = Sections;