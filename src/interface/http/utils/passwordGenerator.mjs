import { generate } from "randomstring";

export const generatePassword = async ()=>{
    const password = generate(7);
    return password;
}

