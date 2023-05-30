const Task = require('../services/Task');
const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');

class TaskController {
    list (req, res) {
        Task.index(req.params.id)
        .then(result => res.status(httpStatus.OK).send(result))
        .catch(e => new ApiError(e?.message));
    }
    insert (req, res) {
        req.body.user_id = req.user;
        Task.create(req.body)
        .then(result => res.status(httpStatus.CREATED).send(result))
        .catch(e => new ApiError(e?.message));
    }
    change (req, res) {
      Task.update(req.params?.id, req.body)
      .then(updatedItem => res.status(httpStatus.OK).send(updatedItem))
      .catch(e => new ApiError(e?.message));
    }
    async remove  (req, res, next) {
        const mainTask = await Task.read({ 'sub_tasks': { $in: req.params?.id } });
        if(mainTask){
            mainTask.sub_tasks = mainTask.sub_tasks.filter((c) => c._id?.toString() !== req.params?.id);
            mainTask.save();//.then((updatedData) => next()).catch(e => new ApiError(e?.message));
        }
        Task.delete(req.params?.id).then(deletedItem => {
            return (!deletedItem) ? ApiError.notFound() : res.status(httpStatus.OK).send({message:"Kayıt silindi."});
        }).catch(e => new ApiError(e?.message));
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
        const mainTask = await Task.read({ 'comments._id': { $in: req.params?.id } });
        if(mainTask){
            mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() === req.params?.id);
            const comment = mainTask.comments[0];
            return res.status(httpStatus.OK).send(comment);
        }else{
            return ApiError.notFound();
        }
    }
    delComment (req, res) {
        Task.read({_id: req.params.id})
        .then(mainTask => {
            if(!mainTask) return ApiError.notFound();
            mainTask.comments = mainTask.comments.filter((c) => c._id?.toString() !== req.params.commentId);
            mainTask.save().then((updatedData) => {
                return res.status(httpStatus.OK).send({ message:"Yorum kaldırıldı", doc:updatedData})
            }).catch(e => new ApiError(e?.message));
        }).catch(e => new ApiError(e?.message));
    }
    addSubTask (req, res) {
        Task.read({_id: req.params.id})
        .then(mainTask => {
            if(!mainTask) return ApiError.notFound();
            //! SubTask create edilir...
            Task.create({ ...req.body, user_id: req.user}).then((subTask) => {
                //! subTask'in referansı mainTask üzerinde gösterilir ve update edilir.
                mainTask.sub_tasks.push(subTask);
                //! kaydedilir.
                mainTask.save().then((updatedData) => {
                    //! Kullanıcıya dökman gönderilir.
                    return res.status(httpStatus.OK).send({ message:"subTask ekleme işlemi tamamlandı", doc:updatedData})
                }).catch(e => new ApiError(e?.message)); 
            }).catch(e => new ApiError(e?.message));
        }).catch(e => new ApiError(e?.message));
    }
    fetchTask (req, res){
        Task.read({_id: req.params.id}, true)
        .then(task => {
            return (!task) ? ApiError.notFound() : res.status(httpStatus.OK).send(task);
        })
        .catch(e => new ApiError(e?.message));
    }
}
module.exports = new TaskController();