const Section = require('../services/Section');
const ApiError = require('../errors/ApiError');
const httpStatus = require('http-status');

class SectionController {
    list(req, res){
        Section.index({id: req.params.id})
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