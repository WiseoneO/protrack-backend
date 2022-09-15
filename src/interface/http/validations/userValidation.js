const Joi = require('joi');



    // validation for signing up user
     exports.createUserSchema = (user) =>{
        const schema = Joi.object({
            full_name: Joi.string().required().min(4),
            phoneNumber: {
                phoneNo: Joi.string().min(11).max(11),
                countryCode: Joi.string().min(1).max(4),
            },
            email: Joi.string().email().min(1).required(),
            password: Joi.string().required().min(6),
        }).unknown();
        return schema.validate(user);
    
    }

    // more validations beneath here
    exports.signInValidation = (user) => {
        const schema = Joi.object({
          email: Joi.string().required().email(),
          password: Joi.string().required(),
        }).unknown();
        return schema.validate(user);
      };

    exports.forgotPasswordValidation = (user) => {
        const schema = Joi.object({
        //   oldPassword: Joi.string().required().min(6),
          newPassword: Joi.string().required().min(6),
          confirmPassword: Joi.string().required().min(6),
        }).unknown();
        return schema.validate(user);
      };




 