const express = require('express');
const User = require('../models/user');
const {
    createTokenForUser,
    validateToken
} = require('../services/auth');

const router = express.Router()

router.get('/signup', (req, res) => {
    return res.render('signup');
});

router.get('/signin', (req, res) => {
    return res.render('signin');
});

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    const user = await User.create({
        fullName,
        email,
        password
    })
    res.redirect("/");
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect('/');
    }
    catch (err) {
        return res.render('signin', {
            error: err.message
        });
    }
});

router.get('/logout', async (req,res)=>{
    res.clearCookie("token").render("signin");
});

module.exports = router;