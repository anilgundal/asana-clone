const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Tasks'); 

const express = require('express');
const router = express.Router();
const { list, insert, change, remove, addComment, getComment, delComment, addSubTask, fetchTask  } = require('../controllers/Tasks');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").get(authenticate, list);
router.route("/:id").patch(authenticate, validate(validation.changeValidation), change);
router.route("/:id").delete(authenticate, remove);

router.route("/:id/get-comment").get(authenticate, getComment);
router.route("/:id/add-comment").post(authenticate, validate(validation.commentValidation), addComment);
router.route("/:id/:commentId").delete(authenticate, delComment);

router.route("/").post(authenticate, validate(validation.insertValidation), insert);
router.route("/:id/sub-task").post(authenticate, validate(validation.insertValidation), addSubTask);
router.route("/:id").get(authenticate, fetchTask);



module.exports = router;