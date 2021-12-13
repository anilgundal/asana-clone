const Task = require('../models/Tasks');
/* Option'da new true demezsen eskisini görürsün */

const insert = (data) => {
    return new Task(data).save();
}

const modify = (data, id) => {
    return Task.findByIdAndUpdate(id, data, {new:true});
}

const remove = (id) => {
    return Task.findByIdAndDelete(id);
}
    /** obje varsa where yoksa boş olarak çalış */
const list = (where) => {
    return Task.find(where || {})
    .populate({
        path: "user_id",
        select: "fullname email picture"
    })
    .populate({
        path: "project_id",
        select: "name"
    });
}; 

const findOne = (where, expand) => {
    if(!expand) return Task.findOne(where);

    return Task.findOne(where)
    .populate({
        path: "user_id",
        select: "fullname email picture"
    })
    .populate({
        path: "project_id",
        select: "name"
    })
    .populate({
        path: "section_id",
        select: "name"
    })
    .populate({
        path: "comments",
        populate: { 
            path: "user_id",
            select: "fullname email picture",
        }
    })
    .populate({
        path: "sub_tasks",
        select: "title description assigned_to isCompleted due_date order sub_tasks statuses",
    });
    
}

module.exports = {
    insert,
    modify,
    list,
    remove,
    findOne
}