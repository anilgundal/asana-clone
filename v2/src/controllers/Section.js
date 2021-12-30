const Section = require('../services/Section');
const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');

class SectionController {
    list(req, res){
        Section.index({project_id: req.params.projectId})
        .then(result => res.status(httpStatus.OK).send(result))
        .catch(e => new ApiError(e?.message));
    }
    insert(req, res){
        req.body.user_id = req.user;
        Section.create(req.body)
        .then((result) => res.status(httpStatus.CREATED).send(result))
        .catch(e => new ApiError(e?.message));
    }
    change(req, res){
        Section.update(req.params?.id, req.body)
        .then(changedItem => res.status(httpStatus.OK).send(changedItem))
        .catch(e => new ApiError(e?.message));
    }
    remove(req, res){
        Section.delete(req.params?.id)
        .then(deletedItem => {
            return (!deletedItem) ? next(ApiError.notFound()) : res.status(httpStatus.OK).send({message:"Kayıt silindi."})})
        .catch(e => new ApiError(e?.message));
    }
}

module.exports = new SectionController();