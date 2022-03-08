const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const idChecker = require('../middlewares/idChecker');// validations
const validation = require('../validations/Users'); // validations
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router.get('/', UserController.list);

// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/profile/:id").get(idChecker, authenticate, UserController.profileDetails);
router.route("/projects").get(authenticate, UserController.projectList);
router.route("/register").post(validate(validation.insertValidation), UserController.insert);
router.route("/").patch(authenticate, UserController.change);// user'ı bildiğimiz için id istemedik!
router.route("/login").post(validate(validation.loginValidation), UserController.login);
router.route("/verify_token").post(authenticate, UserController.verify_token);
router.route("/forgot_password").post(validate(validation.resetPasswordValidation), UserController.resetPassword);
router.route("/change-password").patch(authenticate, validate(validation.changePasswordValidation), UserController.changePassword);
router.route("/upload-picture").post(authenticate, UserController.uploadProfile);
router.route("/:id").delete(idChecker, authenticate, UserController.remove);
 
module.exports = router;