const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const idChecker = require('../middlewares/idChecker');// validations
const validation = require('../validations/Tasks'); 

const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/Task');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").get(authenticate, TaskController.list);
router.route("/:id").patch(idChecker, authenticate, validate(validation.changeValidation), TaskController.change);
router.route("/:id").delete(idChecker, authenticate, TaskController.remove);

router.route("/:id/get-comment").get(idChecker, authenticate, TaskController.getComment);
router.route("/:id/add-comment").post(idChecker, authenticate, validate(validation.commentValidation), TaskController.addComment);
router.route("/:id/:commentId").delete(idChecker, authenticate, TaskController.delComment);

router.route("/").post(authenticate, validate(validation.insertValidation), TaskController.insert);
router.route("/:id/sub-task").post(idChecker, authenticate, validate(validation.insertValidation), TaskController.addSubTask);
router.route("/:id").get(idChecker, authenticate, TaskController.fetchTask);

module.exports = router;