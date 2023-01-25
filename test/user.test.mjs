import chai from 'chai'
import chaihttp from 'chai-http'
chai.use(chaihttp);

const {expect, request} = chai;
const host = `127.0.0.1:3000`

describe('API TEST', async () => { 
    // fall to pass
    it('Registering an already existing email', async ()=>{
        const res = await request(host)
        .post('/api/v1/user/signup')
        .send({
            full_name : "Ogboroge Eghwrudje ",
            email : "ogborogee@gmail.com",
            phoneNumber : {"phoneNo": "08020894511", "countryCode" : "+234" },
            password : "Password@1",
            confirmpassword : "Password@1"
        });
        expect(res).to.have.status(401)
    });

    // pass to pass
    it('Register New User', async ()=>{
        const res = await request(host)
        .post('/api/v1/user/signup')
        .send({
            full_name : "Mimi Frank ",
            email : "mimifrank@gmail.com",
            phoneNumber : {"phoneNo": "08020894512", "countryCode" : "+234" },
            password : "Password@1",
            confirmpassword : "Password@1"
        });
        expect(res).to.have.status(401)
    });

    // pass to pass
    it('Login a registered user', async ()=>{
        const res = await request(host)
        .post('/api/v1/auth/login')
        .send({
            email : "mimifrank@gmail.com",
            password : "Password@1",
        });
        expect(res).to.have.status(200)
    });

    // pass to pass
    it('Verify a registered user account', async ()=>{
        const res = await request(host)
        .get('/api/v1/auth/verify/6377e30dae025de2a2ba83f8/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaXRoQGdtYWlsLmNvbSIsImlhdCI6MTY2ODgwMTI5NCwiZXhwIjoxNjY4ODg3Njk0fQ.MW26IwkXoX257ePgT2JYf6waDwDPUCgjSi0p25_kNNU')
        .set("content-type", 'application/json');
        expect(res).to.have.status(200)
    });

    // pass to pass
    it('Forgot password link', async ()=>{
        const res = await request(host)
        .post('/api/v1/auth/forgot-password/user')
        .send({
            email : "mimifrank@gmail.com",
        });
        expect(res).to.have.status(200)
    });

    // pass to pass
    it('Reset password', async ()=>{
        const res = await request(host)
        .post('/api/v1/auth/user/reset/6377e1831e4dc2e08af636a1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pbWlmcmFua0BnbWFpbC5jb20iLCJpZCI6IjYzNzdlMTgzMWU0ZGMyZTA4YWY2MzZhMSIsImlhdCI6MTY2ODgwMzUzMywiZXhwIjoxNjY4ODA0MTMzfQ.TvP6W7h0e9Um8DmBYCzx8VnQ3GcksUcdDVMzpJMUHTk')
        .send({
            newPassword : "Password@1",
            confirmPassword : "Password@1"
        });
        expect(res).to.have.status(200)
    });



})

