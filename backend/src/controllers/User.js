const User = require('../services/User');
const Project = require('../services/Project');
const ApiError = require('../errors/ApiError');
const httpStatus = require('http-status');
const uuid = require('uuid');
const path = require('path');
const eventEmitter = require('../scripts/events/evenEmitter');
const { passwordToHash, generateAccessToken, generateRefreshToken  } = require('../scripts/utils/helper');

class UserController {
    async insert (req, res) {
        if(req.body.password !== req.body.confirmation) return res.status(httpStatus.BAD_REQUEST).send({message:"Parolanız eşleşmedi!"});
        req.body.password = passwordToHash( req.body.password );
        const userExists = await User.read({ email: req.body.email });
        if (userExists){
            return res.status(httpStatus.UNAUTHORIZED).send({message:"Bu mail ile daha önce kayıt yapılmış!"});
        }else{
            User.create(req.body)
            .then(user => {
                delete user.password; delete user.confirmation;
                res.status(httpStatus.CREATED).send(user)
            })
            .catch(e => new ApiError({message:e?.message}));
        }
    }
    login (req, res) {
        req.body.password = passwordToHash( req.body.password );
        User.read(req.body).then(user  => {
        if(!user) return res.status(httpStatus.NOT_FOUND).send({message:"Kullanıcı adı veya parolası yanlış!"});
            user = {
                ... user.toObject(),
                token: {
                    accessToken: generateAccessToken(user),
                    refreshToken: generateRefreshToken(user),
                }
            };
            delete user.password;
            res.status(httpStatus.OK).send(user);
        }).catch((e) => res.status(httpStatus.NOT_FOUND).send({message:e}));
    }
    list (req, res) {
        User.index()
        .then(result => res.status(httpStatus.OK).send(result))
        .catch(e => new ApiError(e?.message));
    }
    projectList (req, res) {
        Project.index({user_id: req.user?._id})
        .then(result => res.status(httpStatus.OK).send(result))
        .catch(e => new ApiError(e?.message));
    }
    resetPassword (req, res) {
        const newPass = uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
        User.updateWhere({email: req.body.email}, {password: passwordToHash(newPass)})
        .then((updatedUser) => {
            if(!updatedUser) return ApiError.notFound("Bu mail adresi ile kayıt bulunmamaktadır!");
            eventEmitter.emit("send_email", {
                to: updatedUser.email,
                subject: "Şifre Sıfırlama",
                html: `Talebiniz üzerine şifre sıfırlama işlemi gerçekleştirilmiştir. <br />
                Sisteme giriş yaptıktan sonra şifrenizi yenisi ile değiştirmeyi unutmayın! <br />
                Yeni şifreniz: <b>${newPass}</b>`,
              });
              res.status(httpStatus.OK).send({message: "Kayıtlı e-posta adresinize geçici şifrenizi gönderdik."})
        }).catch(e => new ApiError(e?.message));
    }
    changePassword (req, res) {
        //! ...Şifre karşılaştırmaları sonradan hazırlancak.
        req.body.password = passwordToHash(req.body.password);
        User.update(req.user?._id, req.body)
        .then(updatedUser =>  res.status(httpStatus.OK).send({updatedUser : updatedUser}))
        .catch(e => new ApiError(e?.message));
    
    }
    change (req, res) {
        User.update(req.user?._id, req.body)
        .then(updatedUser => res.status(httpStatus.OK).send({updatedUser : updatedUser}))
        .catch(e => new ApiError(e?.message));
    }
    remove (req, res) {
        User.delete(req.params?.id)
        .then(deletedItem => {
            return (!deletedItem) ? next(ApiError.notFound()) : res.status(httpStatus.OK).send({message:"Kayıt silindi."})})
        .catch(e => new ApiError(e?.message));
    }
    uploadProfile (req, res, next) {
        /** path require edildi. join ile beraber ilgili yol bulundu
         * console.log(path.join(__dirname, "../", "uploads/users"));
         * console.log('req.files :>> ', req.files);
        */
    
        /** form input name: picture olarak belirledik
         * extension: path.extname bize dosya adından yola çıkarak uzantısını nokta ile birlikte verir. (.jpeg) gibi.
         * fileName: user id'yi authenticate olunca alıyorduk. Bunu extension ile birleştirdik
         * folderPath: path.join ile bulunduğumuz klasör __dirname, ve gitmek istediğimiz yolu belirttik.
         * mv: express-fileupload'un sunduğu hizmet. Dosyayı taşıma işlemini yapar.
         * Eğer aynı isimde ve uzantıda dosya varsa onu siler yeni olanı ekler.
        */
    
    
        /** APP JS'de AŞAĞIDAKİ İŞLEMLERİ YAPTIK!
         * app.js'de "/uploads" adresini statik gösterim yapabilmesi için işlem yaptık.
         * const path = require('path');
         * app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
        */
    
        
        if(!req?.files?.picture && !req.body?.picture) return ApiError.badRequest("Dosya seçin!", 400);
        if(req?.body?.picture){
            User.update(req.user?._id, req.body)
            .then(updatedUser => res.status(httpStatus.OK).send({updatedUser : updatedUser}))
            .catch(e => new ApiError(e?.message));
        }
        else if(req?.files?.picture){
            const extension = path.extname(req.files.picture.name);
            const fileName = `${req?.user?._id}${extension}`;
            const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
            req.files.picture.mv(folderPath, function(err) {
                if(err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:"Dosya yükleme başarısız oldu!", error:err});
                User.update(req.user._id, {picture: fileName})
                .then(u => res.status(httpStatus.OK).send({message:"Yükleme ve kayıt işlemleri başarılı oldu.", updatedUser:u}))
                .catch(e => new ApiError(e?.message));
            });
        }
    }
    verify_token (req, res) {
        return res.status(httpStatus.OK).send({message : "Verifield!"});
    }
}
module.exports = new UserController();