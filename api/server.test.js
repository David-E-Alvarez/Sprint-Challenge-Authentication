const request = require('supertest');
const server = require('./server.js');


describe('server', ()=>{
    it('should return hello world', ()=>{
        return request(server).get('/')
            .then(res =>{
                console.log("res.body in server test:", res.body)
                expect(res.body).toBe("hello world")
            })
    })
})