const { insert, modify, list, remove } = require('../services/Sections');
const httpStatus = require('http-status');


const index = (req, res) => {
    if(!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({ error: 'Proje seçilmedi!'})
    list({project_id: req.params.projectId}).then(result => {
        res.status(httpStatus.OK).send(result)
    }).catch(e => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
}
const create = (req, res) => {
    req.body.user_id = req.user;
    insert(req.body).then((result) => {
        res.status(httpStatus.CREATED).send(result);
    })
    .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
}
const update = (req, res) => {
  if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
  modify(req.body, req.params?.id).then(updatedItem => {
      res.status(httpStatus.OK).send(updatedItem);
  }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt güncelleme işlemi başarısız oldu."}));
}
const deleteSection = (req, res) => {
    if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
    remove(req.params?.id).then(deletedItem => {
        if(!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        res.status(httpStatus.OK).send({message:"Kayıt silindi."});
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt silme işlemi başarısız oldu."}));
};

module.exports = {
    index,
    create,
    update,
    deleteSection
}

