const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

const authController = require('../controllers/auth')

router.post('/signup',
    [
        check('first_name')
            .isLength({min: 5})
            .withMessage('last name should be at least 5 character long.')
            .isAlphanumeric()
            .trim(),
        check('last_name')
            .isLength({min: 5})
            .withMessage('last name should be at least 5 character long.')
            .isAlphanumeric()
            .trim(),
        check('email')
            .isEmail()
            .withMessage('Enter valid email.')
            .trim()
        ,
        check('password')
            .isLength({min: 10})
            .withMessage('Password Should be at least 10 character.')
            .trim()
    ], authController.signUp);

router.post('/signin',
    [
        check('email')
            .isEmail()
            .withMessage('Enter valid email.')
            .trim(),
        check('email')
            .isLength({min: 10})
            .withMessage('Password Should be at least 10 character.')
            .trim()

    ], authController.login);


module.exports = router;