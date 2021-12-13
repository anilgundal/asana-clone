const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Tasks'); 

const express = require('express');
const router = express.Router();
const { index, create, update, deleteObject, addComment, delComment, addSubTask, fetchTask  } = require('../controllers/Tasks');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").post(authenticate, validate(validation.createValidation), create);
router.route("/:id").patch(authenticate, validate(validation.updateValidation), update);
router.route("/:id").delete(authenticate, deleteObject);

router.route("/:id/add-comment").post(authenticate, validate(validation.commentValidation), addComment);
router.route("/:id/:commentId").delete(authenticate, delComment);

router.route("/:id/sub-task").post(authenticate, validate(validation.createValidation), addSubTask);
router.route("/:id").get(authenticate, fetchTask);


module.exports = router;