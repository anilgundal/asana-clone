const { insert, modify, list, remove, findOne } = require('../services/Tasks');
const httpStatus = require('http-status');

const index = (req, res) => {
    if(!req?.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ error: 'Item seçilmedi!'})
    list({id: req.params.id}).then(result => {
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
const deleteObject = (req, res) => {
    if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
    remove(req.params?.id).then(deletedItem => {
        if(!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        res.status(httpStatus.OK).send({message:"Kayıt silindi."});
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt silme işlemi başarısız oldu."}));
};

const addComment = (req, res) => {

    findOne({_id: req.params.id}).then((mainTask) => {
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        const comment = {
            ...req.body, 
            commented_at: new Date(),
            user_id: req.user
        };

        mainTask.comments.push(comment);
        
        mainTask.save().then((updatedData) => {
            return res.status(httpStatus.OK).send({ message:"Yorum ekleme işlemi tamamlandı", doc:updatedData})
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Yorum ekleme işlemi başarısız oldu."})); 
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Main data not found."}));

}

const delComment = (req, res) => {
    findOne({_id: req.params.id}).then((mainTask) => {
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'})
        mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
        mainTask.save().then((updatedData) => {
            return res.status(httpStatus.OK).send({ message:"Yorum kaldırıldı", doc:updatedData})
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Yorum silme işlemi başarısız oldu."})); 
    }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Main data not Found!"}));
}

const addSubTask = (req, res) => {
    
  if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});

    //! mainTask çekilir...
  findOne({_id: req.params.id}).then((mainTask) => {

    if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});

    //! SubTask create edilir...
    insert({ ...req.body, user_id: req.user}).then((subTask) => {
        //! subTask'in referansı mainTask üzerinde gösterilir ve update edilir.
        mainTask.sub_tasks.push(subTask);
        //! kaydedilir.
        mainTask.save().then((updatedData) => {
            //! Kullanıcıya dökman gönderilir.
            return res.status(httpStatus.OK).send({ message:"subTask ekleme işlemi tamamlandı", doc:updatedData})

        }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"mainTask güncelleme işlemi başarısız oldu."})); 
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"subTask ekleme işlemi başarısız oldu."}));
}).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Main data not found."}));

}



const fetchTask = (req, res) => {
    if(!req?.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ error: 'Item seçilmedi!'});
    findOne({_id: req.params.id}, true).then((task) => {
        if(!task) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        res.status(httpStatus.OK).send(task);
    }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error:e, message:"fetchTask data not Found!"}));
}

module.exports = {
    index,
    create,
    update,
    deleteObject,
    addComment,
    delComment,
    addSubTask,
    fetchTask
}

