const Task = require('../services/Task');
const httpStatus = require('http-status');

class TaskController {
    list (req, res) {
        Task.index(req.params.id)
        .then(result => res.status(httpStatus.OK).send(result))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    }
    insert (req, res) {
        req.body.user_id = req.user;
        Task.create(req.body)
        .then(result => res.status(httpStatus.CREATED).send(result))
        .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
    }
    change (req, res) {
      if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
      Task.update(req.params?.id, req.body)
      .then(updatedItem => res.status(httpStatus.OK).send(updatedItem))
      .catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt güncelleme işlemi başarısız oldu.", error: e}));
    }
    async remove  (req, res, next) {
        if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
        const mainTask = await Task.read({ 'sub_tasks': { $in: req.params?.id } });
        if(mainTask){
            mainTask.sub_tasks = mainTask.sub_tasks.filter((c) => c._id?.toString() !== req.params?.id);
            mainTask.save().then((updatedData) => {
                next();
            })//.catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"SubTask silme işlemi başarısız oldu."}));
        }
        Task.delete(req.params?.id).then(deletedItem => {
            if(!deletedItem) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
            return res.status(httpStatus.OK).send({message:"Kayıt silindi."});
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Kayıt silme işlemi başarısız oldu.", error:e}));
    }
    addComment (req, res) {
        Task.read({_id: req.params.id})
        .then(mainTask => {
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
    async getComment (req, res) {
        if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
        const mainTask = await Task.read({ 'comments._id': { $in: req.params?.id } });
        if(mainTask){
            mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() === req.params?.id);
            const comment = mainTask.comments[0];
            return res.status(httpStatus.OK).send(comment);
        }else{
            return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        }
    }
    delComment (req, res) {
        Task.read({_id: req.params.id})
        .then(mainTask => {
            if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'})
            mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
            mainTask.save().then((updatedData) => {
                return res.status(httpStatus.OK).send({ message:"Yorum kaldırıldı", doc:updatedData})
            }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Yorum silme işlemi başarısız oldu."})); 
        }).catch(e => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message:"Main data not Found!"}));
    }
    addSubTask (req, res) {
      if(!req.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ message: 'Geçersiz ID'});
        //! mainTask çekilir...
      Task.read({_id: req.params.id})
      .then(mainTask => {
        if(!mainTask) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
        //! SubTask create edilir...
        Task.create({ ...req.body, user_id: req.user}).then((subTask) => {
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
    fetchTask (req, res){
        if(!req?.params?.id) return res.status(httpStatus.BAD_REQUEST).send({ error: 'Item seçilmedi!'});
        Task.read({_id: req.params.id}, true)
        .then(task => {
            if(!task) return res.status(httpStatus.NOT_FOUND).send({ message: 'Kayıt bulunamadı!'});
            res.status(httpStatus.OK).send(task);
        }).catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error:e, message:"fetchTask data not Found!"}));
    }
}
module.exports = new TaskController();