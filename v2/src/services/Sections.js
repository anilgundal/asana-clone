const Sections = require('../models/Sections');
/* Option'da new true demezsen eskisini görürsün */

const insert = (data) => {
    return new Sections(data).save();
}

const modify = (data, id) => {
    return Sections.findByIdAndUpdate(id, data, {new:true});
}

const remove = (id) => {
    return Sections.findByIdAndDelete(id);
}
    /** obje varsa where yoksa boş olarak çalış */
const list = (where) => {
    return Sections.find(where || {})
    .populate({
        path: "user_id",
        select: "fullname email picture"
    })
    .populate({
        path: "project_id",
        select: "name"
    });
}; 

module.exports = {
    insert,
    modify,
    list,
    remove
}