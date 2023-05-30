const Project = require('../services/Project');
const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');

class ProjectController {
    list (req, res) {
        Project.index()
        .then(result => res.status(httpStatus.OK).send(result))
        .catch(e => next(new ApiError(e?.message)));
    }
    insert (req, res) {
        req.body.user_id = req.user;
        Project.create(req.body)
        .then(result => res.status(httpStatus.CREATED).send(result))
        .catch(e => next(new ApiError(e?.message)));
    }
    change (req, res, next) {
        Project.update(req.params?.id, req.body)
        .then(updatedItem => {
            return (!updatedItem) ? next(ApiError.notFound()) : res.status(httpStatus.OK).send(updatedItem);
        }).catch(e => next(new ApiError(e?.message)));
    }
    remove(req, res) {
        Project.delete(req.params?.id)
        .then(deletedItem => {
            return (!deletedItem) ? next(ApiError.notFound()) : res.status(httpStatus.OK).send({message:"Proje silindi."});
        }).catch(e => next(new ApiError(e?.message)));
    }
}

module.exports = new ProjectController();