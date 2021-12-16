const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Users'); // validations
const express = require('express');
const router = express.Router();
const { insert, list, change, remove, login, projectList, resetPassword, changePassword, uploadProfile } = require('../controllers/Users');

router.get('/', list);

// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").post(validate(validation.insertValidation), insert);
router.route("/").patch(authenticate, validate(validation.changeValidation), change);// user'ı bildiğimiz için id istemedik!
router.route("/login").post(validate(validation.loginValidation), login);
router.route("/projects").get(authenticate, projectList);
router.route("/reset-password").post(validate(validation.resetPasswordValidation), resetPassword);
router.route("/change-password").patch(authenticate, validate(validation.changePasswordValidation), changePassword);
router.route("/upload-picture").post(authenticate, uploadProfile);
router.route("/:id").delete(authenticate, remove);
 
module.exports = router;