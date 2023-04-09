const User = require('../models/user');
const Social = require('../models/socials');
const ProfessionalInfo = require('../models/professionalInfo')
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getUserDetail = async (req,res,next) => {
    const user_id = new mongoose.Types.ObjectId(req.query.user_id);

    const userFound = await User.findOne({_id: user_id})
        .populate('socials')
        .populate('professionalInfo')
        .populate('followers')


    if(userFound){
        res.status(200).json({success:true, user: userFound, msg: 'User found!' })
    }else {
        res.status(400).json({success:false, user: null, msg: 'User not found!'})
    }
}

exports.UpdateAboutMe = async (req,res,next) => {
    console.log(req.body)
    const user_id = new mongoose.Types.ObjectId(req.body.user_id);
    const about_me = req.body.about_me;

    const userFound = await User.findOne({_id: user_id});

    if(userFound){
        userFound.about_me = about_me;
        userFound.save().then(()=>{
            res.status(200).json({success:true, user: userFound, msg: 'About Me updated' })
        }).catch(()=>{
            res.status(400).json({success:false, user: null, msg: 'Something goes wrong'})
        })
    }else {
        res.status(400).json({success:false, user: null, msg: 'User not found!'})
    }
}

exports.UpdateOnTheWeb = async (req,res,next) => {
    const user_id = new mongoose.Types.ObjectId(req.body.user_id);

    let linkedIn, github, facebook, twitter, instagram, website;

    linkedIn = req.body.linkedIn;
    github = req.body.github;
    facebook = req.body.facebook;
    twitter = req.body.twitter;
    instagram = req.body.instagram;
    website = req.body.website;

    let socialFound = await Social.findOne({user: user_id});

    if(socialFound){
        socialFound.linkedIn = linkedIn;
        socialFound.github = github;
        socialFound.facebook = facebook;
        socialFound.twitter = twitter;
        socialFound.instagram = instagram;
        socialFound.website = website;
    }else {
        socialFound = new Social({
            user: user_id,
            linkedIn: linkedIn,
            github:github,
            facebook: facebook,
            twitter: twitter,
            instagram: instagram,
            website: website
        });
    }

    socialFound.save().then(async ()=>{
        let userFound = await User.findOne({_id: user_id})
        userFound.socials = socialFound._id
        userFound.save().then(()=>{
            res.status(200).json({success:true, user: socialFound, msg: 'On the Web updated!' })
        }).catch(err=>console.log(err))
    }).catch(()=>{
        res.status(400).json({success:false, user: null, msg: 'Something goes wrong'})
    })
}


exports.updateProfessionalInfo = async (req,res,next) => {
    const user_id = new mongoose.Types.ObjectId(req.body.user_id);

    let highest_education, currently_doing;

    highest_education = req.body.highest_education;
    currently_doing = req.body.currently_doing;

    let professionalInfo = await ProfessionalInfo.findOne({user: user_id});

    if(professionalInfo){
        professionalInfo.highest_education = highest_education;
        professionalInfo.currently_doing = currently_doing;
    }else {

        professionalInfo = await new ProfessionalInfo({
            user: user_id,
            highest_education : highest_education,
            currently_doing : currently_doing
        });
    }

    professionalInfo.save().then(async ()=>{
        let userFound = await User.findOne({_id: user_id})
        userFound.professionalInfo = professionalInfo._id
        userFound.save().then(()=>{
            res.status(200).json({success:true, msg: 'On the Web updated!' })
        }).catch(err=>console.log(err))
    }).catch(()=>{
        res.status(400).json({success:false, user: null, msg: 'Something goes wrong'})
    });
}

exports.updatePassword = async (req,res,next) => {
    let email, password, new_password, confirm_password;

    email = req.body.email;
    password = req.body.password;
    new_password = req.body.new_password;
    confirm_password = req.body.confirm_password;

    if(new_password!==confirm_password)
        res.status(400).json({success:false, msg:'Password not matched'})

    let loaderUser;

    User.findOne({email: email})
        .then(user => {
            loaderUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                res.status(422).json({success: false, message: 'Password Incorrect!'})
            } else {
                bcrypt
                    .hash(new_password, 12)
                    .then(hashedPw => {
                        loaderUser.password = hashedPw;
                        return loaderUser.save()
                    })
                    .then(() => {
                        res.status(200).json({
                            success: true,
                            msg: 'Password Changed Successfully!',
                        });
                    }).catch((err) => console.log(err))
            }
        }).catch(err=>console.log(err))
}

exports.updateProfile = async (req,res,next) => {
    console.log(req.body)
    const user_id = new mongoose.Types.ObjectId(req.body.user_id);

    let profile_img, first_name, last_name, phone_num = null;

    profile_img = req.body.profile_img;
    phone_num = req.body.phone_num;
    first_name = req.body.first_name;
    last_name = req.body.last_name;

    let userFound = await User.findOne({_id: user_id});

    if(userFound){

        userFound.first_name = first_name;
        userFound.last_name = last_name;

        if (profile_img)
            userFound.profile_img = profile_img;
        if(phone_num)
            userFound.phone_num = phone_num;

        userFound.save().then(()=>{
            res.status(200).json({success: true, message: 'Profile Updated Successfully'})
        });
    }else {
        res.status(400).json({success: false, message: 'User not Found!'})
    }

}