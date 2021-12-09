const validate = require('../middlewares/validate');// validate middleware
const authenticate = require('../middlewares/authenticate');// validations
const validation = require('../validations/Users'); // validations
const express = require('express');
const router = express.Router();

const { 
    create,
    index,
    login,
    projectList,
    resetPassword,
    changePassword,
    update,
    deleteUser,
    uploadProfile,
} = require('../controllers/Users');


router.get('/', index);

// validate'e schemaların içerisindeki createValidation'ı aktar
router.route("/").post(validate(validation.createValidation), create);
router.route("/").patch(authenticate, validate(validation.updateValidation), update);// user'ı bildiğimiz için id istemedik!
router.route("/login").post(validate(validation.loginValidation), login);
router.route("/projects").get(authenticate, projectList);
router.route("/reset-password").post(validate(validation.resetPasswordValidation), resetPassword);
router.route("/change-password").patch(authenticate, validate(validation.changePasswordValidation), changePassword);
router.route("/upload-picture").post(authenticate, uploadProfile);
router.route("/:id").delete(authenticate, deleteUser);
 
module.exports = router;