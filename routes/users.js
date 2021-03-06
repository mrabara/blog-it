const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please add valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({errors: errors.array()});
    }
    
    const {name, email, password} = req.body

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [{msg: 'User Already Exist'}]
            });
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save()


        const payload = {
            user: {
                id: user.id
            }
        }
       
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        return res.status(500).send('Server Error');
    }

   
});

module.exports = router;