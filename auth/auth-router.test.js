const request = require('supertest');
const authRouter = require('./auth-router.js');


describe('auth-router.js tests',() => {
    it('should return hello world', ()=>{
        return request(authRouter).get('/helloWorld')
            .then(res =>{
                console.log("res.body in authRouter test:", res.body)
                expect(res.body).toBe("hello world")
            })
    })
})