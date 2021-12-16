const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Projects'); 

const express = require('express');
const router = express.Router();
const { list, insert, change, remove } = require('../controllers/Projects');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").get(authenticate, list);
router.route("/").post(authenticate, validate(validation.insertValidation), insert);
router.route("/:id").patch(authenticate, validate(validation.changeValidation), change);
router.route("/:id").delete(authenticate, remove);

module.exports = router;