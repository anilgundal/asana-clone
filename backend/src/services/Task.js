const BaseService = require("./BaseService");
const BaseModel = require("../models/Tasks");

class Task extends BaseService {
    constructor(){
        super(BaseModel);
    }
    index(where){
        return this.BaseModel.find(where || {}).populate([
            {path: "user_id", select: "fullname email picture"},
            {path: "project_id", select: "name"}
        ]);
    };
    read(where, expand){
        if(!expand) return this.BaseModel.findOne(where);
        return BaseModel.findOne(where).populate([
            {path: "user_id", select: "fullname email picture" },
            {path: "project_id", select: "name" },
            {path: "section_id", select: "name" },
            {path: "sub_tasks", select: "title description assigned_to isCompleted due_date order sub_tasks statuses" },
            {path: "comments", populate: { path: "user_id", select: "fullname email picture" } },
        ]);
    }
}

module.exports = new Task();