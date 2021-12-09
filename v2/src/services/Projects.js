const Project = require('../models/Projects');

const insert = (data) => {
    const projects = new Project(data);
    return  projects.save();
}

const modify = (data, id) => {
    /* Option'da new true demezsen eskisini görürsün */
    return Project.findByIdAndUpdate(id, data, {new:true});
}

const remove = (id) => {
    /* Option'da new true demezsen eskisini görürsün */
    return Project.findByIdAndDelete(id);
}

const list = (where) => {
    /** obje varsa where yoksa boş olarak çalış */
    return Project.find(where || {}).populate({
        path: "user_id",
        select: "fullname email picture"
    });
    
}; 

module.exports = {
    insert,
    modify,
    list,
    remove
}