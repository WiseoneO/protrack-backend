import joi from 'joi';
import joiPasswordComplexity from 'joi-password-complexity';

const complexityOptions = {
  min: 8,
  max: 50,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 4,
}

// validation for signing up user
export function createUserSchema(user){
  const schema = joi.object({
    full_name: joi.string().required().min(4),
    phoneNumber: {
        phoneNo: joi.string().min(11).max(11),
        countryCode: joi.string().min(1).max(4),
    },
    email: joi.string().email().min(1).required(),
    password: joiPasswordComplexity(complexityOptions).required().min(8),
    confirmpassword : joi.string().min(8).max(128).required().valid(joi.ref('password')),

  }).unknown();
  return schema.validate(user);
    
}
// validation for change password
export function changePasswordSchema(user){
  const schema = joi.object({
    newPassword: joiPasswordComplexity(complexityOptions).required().min(8),

  }).unknown();
  return schema.validate(user);
    
}
// validation for change password
export function validateEmailSchema(user){
  const schema = joi.object({
    email: joi.string().email().min(1).required(),
  }).unknown();
  return schema.validate(user);
    
}

// more validations beneath here
export function signInValidation(user) {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
  }).unknown();
  return schema.validate(user);
}

export function forgotPasswordValidation(user) {
  const schema = joi.object({
    newPassword: joiPasswordComplexity(complexityOptions).required().min(8),
    confirmPassword : joi.string().min(8).max(128).required().valid(joi.ref('newPassword')),
  }).unknown();
  return schema.validate(user);
}

export function subscriptionValidation(payload) {
  const schema = joi.object({
    description: joi.string().required(),
    plan: joi.string().required(),
    payment_status: joi.string().required(),
    amount: joi.string().required(),
  }).unknown();
  return schema.validate(payload);
}


 