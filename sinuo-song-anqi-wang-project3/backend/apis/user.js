const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

const UserModel = require('../db/user/user.model');
const { findUserByToken } = require('./middleware');

router.post('/', async function(request, response) {
    const body = request.body;

    const newUserResponse = await UserModel.createUser(body)
   
    response.send("Created new user!");
})

router.post('/login', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const createUserResponse = await UserModel.attemptLogin(username, password)

        if (!createUserResponse) {
            return res.status(403).send("Invalid password")
        }

        const token = jwt.sign({ id: createUserResponse._id }, "HUNTERS_PASSWORD")
        res.cookie("token", token);
        return res.send("User logged in successfully")
    
    } catch (e) {
        res.status(401).send(null);
    }
})

router.post('/register', async function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if(!username || !password) {
            return res.status(409).send("Missing username or password")
        }

        const createUserResponse = await UserModel.createUser({username: username, password: password});

        const token = jwt.sign({ id: createUserResponse._id }, "HUNTERS_PASSWORD")

        res.cookie("token", token);
        
        return res.send("User created successfully")
    
    } catch (e) {
        res.status(401).send("Error: username already exists");
    }
})

router.get('/isLoggedIn', findUserByToken, async function(req, res) {

    const user = req.user;
    if (!user) {
        return res.send({ username: null });
    }
    return res.send({ username: user.username })

})

router.post('/logOut', async function(req, res) {

    res.cookie('token', '', {
        maxAge: 0,
    })

    res.send(true);

});

router.get('/:username', async function(req, res) {
    const username = req.params.username;

    const userData = await 
    UserModel.findUserByUsername(username);

    return res.send(userData);
})

router.put('/update', findUserByToken, async function (req, res) {
    req.username.bio = req.body.bio;
    await req.username.save();
    return res.send(req.username);
})


module.exports = router