let BaseModel = null;
class BaseService {
    constructor(model){
        this.BaseModel = model;
    }
    create(data) {
        return new this.BaseModel(data).save();
    }
    index(where) {
        return this.BaseModel?.find(where || {});
    }
    read(where) {
        return this.BaseModel.findOne(where || {});
    }
    fetched(where, fields) {
        return this.BaseModel.findOne(where || {}).select(fields || {});
    }
    update(id, data) {
        return this.BaseModel.findByIdAndUpdate(id, data, {new:true});
    }
    updateWhere(where, data){
        return this.BaseModel.findOneAndUpdate(where, data, {new:true});
    }
    delete(id) {
        return this.BaseModel.findByIdAndDelete(id);
    }
}
module.exports = BaseService;
