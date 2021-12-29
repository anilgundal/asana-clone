const Project = require('../services/Project');
const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');

class ProjectController {
    list (req, res) {
        Project.index()
        .then(result => res.status(httpStatus.OK).send(result))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    }
    insert (req, res) {
        req.body.user_id = req.user;
        Project.create(req.body)
        .then(result => res.status(httpStatus.CREATED).send(result))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    }
    change (req, res, next) {
        Project.update(req.params?.id, req.body)
        .then(updatedItem => {
            if(!updatedItem) return next(ApiError.notFound());
            res.status(httpStatus.OK).send(updatedItem);
        }).catch(e => next(new ApiError(e?.message)));
    }
    remove(req, res) {
        if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
        Project.delete(req.params?.id)
        .then(deletedItem => {
            if(!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
            res.status(httpStatus.OK).send({message:"Proje silindi."});
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt silme işlemi başarısız oldu."}));
    }
}

module.exports = new ProjectController();