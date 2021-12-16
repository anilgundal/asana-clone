const Project = new (require('../services/Projects'))("ProjectService");
const httpStatus = require('http-status');

const list = (req, res) => {
    Project.index()
    .then(result => res.status(httpStatus.OK).send(result))
    .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
}
const insert = (req, res) => {
    req.body.user_id = req.user;
    Project.create(req.body)
    .then(result => res.status(httpStatus.CREATED).send(result))
    .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
}
const change = (req, res) => {
    if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
    Project.update(req.params?.id, req.body)
    .then(updatedItem => res.status(httpStatus.OK).send(updatedItem))
    .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt güncelleme işlemi başarısız oldu.", error: e}));
}
const remove = (req, res) => {
    if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
    Project.delete(req.params?.id)
    .then(deletedItem => {
        if(!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        res.status(httpStatus.OK).send({message:"Proje silindi."});
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt silme işlemi başarısız oldu."}));
};

module.exports = {
    list,
    insert,
    change,
    remove
}