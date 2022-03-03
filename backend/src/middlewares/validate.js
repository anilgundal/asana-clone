const httpStatus = require('http-status');

const validate = (schema) => (req, res, next) => {
   const {value, error} = schema.validate(req.body);

   if(error){
    // mesaj çıktışı şöyle  
    // output: error.detail[{message: ""}, {message: ""}]
      
    // error mesajını mapledik
    // ["", "", ""] => "aaa, bbb, ccc" haline getirdik.
    const errorMessage = error.details?.map(detail => detail.message).join(", ");
    
    res.status(httpStatus.BAD_REQUEST).json({message:errorMessage});

    return;
   }

   Object.assign(req, value);
   return next(); 
} 

module.exports = validate; 