const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const idChecker = require('../middlewares/idChecker');// validations
const validation = require('../validations/Sections'); 

const express = require('express');
const router = express.Router();
const SectionController = require('../controllers/Section');


// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").post(authenticate, validate(validation.insertValidation), SectionController.insert);
router.route("/:id").get(idChecker, authenticate, SectionController.list);
router.route("/:id").patch(idChecker, authenticate, validate(validation.changeValidation), SectionController.change);
router.route("/:id").delete(idChecker, authenticate, SectionController.remove);

module.exports = router;