const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');


beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db('users').truncate();
  }); 
describe('auth-router.js tests',() => {
    //test #1
    it('should return hello world', ()=>{
        return request(server).get('/api/auth/helloWorld')
            .then(res =>{
                console.log("res.body in authRouter test:", res.body)
                expect(res.body).toBe("hello world!")
            })
    })
    //test #1 for /register endpoint
    it('should expect 400', ()=>{
        return request(server).post('/api/auth/register')
            .then(res => {
                console.log('res.body', res.body)
                expect(res.status).toBe(400)
            })
    })
    //test #2 for /register endpoint
    it('should add users to db', async()=>{
        await db('users').insert({username: "david", password: "david's pass"});
        await db('users').insert({username: "david2", password: "david 2's pass"});
        await db('users').insert({username: "david3", password: "david 3's pass"});
        const users = await db('users');
        expect(users).toHaveLength(3);
    })
})