const Ramdomstring = require("randomstring");

exports.generatePassword = ()=>{
    const password = Ramdomstring.generate(7);
    return password;
}

