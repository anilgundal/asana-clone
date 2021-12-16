const Section = new (require('../services/Sections'))("SectionService");
const httpStatus = require('http-status');

const list = (req, res) => {
    if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({ error: 'Proje seçilmedi!'})
    Section.index({project_id: req.params.projectId})
    .then(result => res.status(httpStatus.OK).send(result))
    .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
}
const insert = (req, res) => {
    req.body.user_id = req.user;
    Section.create(req.body)
    .then((result) => res.status(httpStatus.CREATED).send(result))
    .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
}
const change = (req, res) => {
    if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
    Section.update(req.params?.id, req.body)
    .then(changedItem => res.status(httpStatus.OK).send(changedItem))
    .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt güncelleme işlemi başarısız oldu.", error:e}));
}
const remove = (req, res) => {
    if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
    Section.delete(req.params?.id)
    .then(deletedItem => {
        if(!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        res.status(httpStatus.OK).send({message:"Kayıt silindi."});
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt silme işlemi başarısız oldu.", error:e}));
};

module.exports = {
    list,
    insert,
    change,
    remove
}