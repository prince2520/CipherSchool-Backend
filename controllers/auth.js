const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

exports.signUp = async (req, res, next) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const phone_num = req.body.phone_num;

    const invalidInput = validationResult(req);

    if (!invalidInput.isEmpty()) {
        res.status(422).json({invalidInput: invalidInput})
    } else {

        const foundUser = await User.findOne({email: email});

        if (foundUser) {
            res.status(422).json({success: false, message: 'Email already exit!'})
        } else {
            bcrypt
                .hash(password, 12)
                .then(hashedPw => {
                    const user = new User({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: hashedPw
                    });

                    return user.save();
                })
                .then(() => {
                    res.status(201).json({success: true, message: 'User Created'})
                }).catch((err) => console.log(err))
        }
    }
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body)

    const invalidInput = validationResult(req);

    if (!invalidInput.isEmpty()) {
        res.status(422).json({invalidInput: invalidInput})
    }

    let loadedUser;

    User.findOne({email: email})
        .then(user => {
            loadedUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                res.status(422).json({success: false, message: 'Password Incorrect!'})
            } else {
                const token = jwt.sign(
                    {
                        email: loadedUser.email,
                        user_id: loadedUser._id.toString()
                    },
                    'cipher-schools',
                    {expiresIn: '1h'}
                );
                res.status(200).json({
                    success: true,
                    msg: 'User login Successfully',
                    token: token,
                    isAuth: true,
                    user_id: loadedUser._id,
                    email: loadedUser.email,
                    first_name: loadedUser.first_name,
                    last_name: loadedUser.last_name
                });
            }
        }).catch(err => {
        res.status(422).json({success: false, message: 'Email not found!'})
    })
}