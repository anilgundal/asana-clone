const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Users'); // validations
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router.get('/', UserController.list);

// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").post(validate(validation.insertValidation), UserController.insert);
router.route("/").patch(authenticate, validate(validation.changeValidation), UserController.change);// user'ı bildiğimiz için id istemedik!
router.route("/login").post(validate(validation.loginValidation), UserController.login);
router.route("/projects").get(authenticate, UserController.projectList);
router.route("/reset-password").post(validate(validation.resetPasswordValidation), UserController.resetPassword);
router.route("/change-password").patch(authenticate, validate(validation.changePasswordValidation), UserController.changePassword);
router.route("/upload-picture").post(authenticate, UserController.uploadProfile);
router.route("/:id").delete(authenticate, UserController.remove);
 
module.exports = router;