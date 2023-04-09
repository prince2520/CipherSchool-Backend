const express = require('express')

const {getUserDetail, UpdateAboutMe, UpdateOnTheWeb, updateProfessionalInfo, updatePassword, updateProfile} = require("../controllers/user");

const router = express.Router();

router.get('/getUserDetail',getUserDetail);

router.put('/updateAboutMe',UpdateAboutMe)

router.put('/updateOnTheWeb',UpdateOnTheWeb)

router.put('/updateProfessionalInfo',updateProfessionalInfo);

router.put('/updatePassword',updatePassword);

router.put('/updateProfile',updateProfile);

module.exports = router;
