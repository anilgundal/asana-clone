const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Sections'); 

const express = require('express');
const router = express.Router();
const { index, create, update, deleteSection  } = require('../controllers/Sections');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/:projectId").get(authenticate, index);
router.route("/").post(authenticate, validate(validation.createValidation), create);
router.route("/:id").patch(authenticate, validate(validation.updateValidation), update);
router.route("/:id").delete(authenticate, deleteSection);

module.exports = router;