const Users = require('../models/Users');

const insert = (data) => {
    const user = new Users(data);
    return  user.save();
}

const loginUser = (loginData) => { 
    return Users.findOne(loginData);
}

const list = () => Users.find({}); 

const modify = (where, data) => {
    return Users.findOneAndUpdate(where, data, {new:true});
}
const remove = (id) => {
    return Users.findByIdAndDelete(id);
}
module.exports = {
    insert,
    list,
    modify,
    loginUser,
    remove
}