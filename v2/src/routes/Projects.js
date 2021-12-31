const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const idChecker = require('../middlewares/idChecker');// validations
const validation = require('../validations/Projects'); 

const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/Project');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").get(authenticate, ProjectController.list);
router.route("/").post(authenticate, validate(validation.insertValidation), ProjectController.insert);
router.route("/:id").patch(idChecker, authenticate, validate(validation.changeValidation), ProjectController.change);
router.route("/:id").delete(idChecker, authenticate, ProjectController.remove);

module.exports = router;