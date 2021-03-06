const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});



router.post('/', [
    check('email', 'Please add valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }
    
    const { email, password} = req.body

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [{msg: 'Invalid Credentials'}]
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                errors: [{msg: 'Invalid Credentials'}]
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }
       
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: '5 days'
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        return res.status(500).send('Server Error');
    }

   
});

module.exports = router;