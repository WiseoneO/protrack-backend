import joi from 'joi';

// validation for signing up user
export function createUserSchema(user){
  const schema = object({
    full_name: joi.string().required().min(4),
    phoneNumber: {
        phoneNo: joi.string().min(11).max(11),
        countryCode: joi.string().min(1).max(4),
    },
    email: joi.string().email().min(1).required(),
    password: joi.string().required().min(6),
  }).unknown();
  return schema.validate(user);
    
}

// more validations beneath here
export function signInValidation(user) {
  const schema = object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  }).unknown();
  return schema.validate(user);
}

export function forgotPasswordValidation(user) {
  const schema = object({
  //   oldPassword: joi.string().required().min(6),
    newPassword: joi.string().required().min(8),
    confirmpassword : joi.string().min(8).max(128).required().valid(joi.ref('password')),
  }).unknown();
  return schema.validate(user);
}

export function subscriptionValidation(payload) {
  const schema = object({
    description: joi.string().required(),
    plan: joi.string().required(),
    payment_status: joi.string().required(),
    amount: joi.string().required(),
  }).unknown();
  return schema.validate(payload);
}


 