const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Projects'); 

const express = require('express');
const router = express.Router();
const { index, create, update, deleteProject  } = require('../controllers/Projects');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").get(authenticate, index);
router.route("/").post(authenticate, validate(validation.createValidation), create);
router.route("/:id").patch(authenticate, validate(validation.updateValidation), update);
router.route("/:id").delete(authenticate, deleteProject);

module.exports = router;