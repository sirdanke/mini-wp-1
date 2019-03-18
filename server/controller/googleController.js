const Users = require('../models/users')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_OAUTH);



class googleController {

    static signin(req, res) {
        client
            .verifyIdToken({
                idToken: req.body.id_token
            })
            .then(data => {
                let payload = data.getPayload()
                return Users.findOne({ email: payload.email })
                    .then(user => {
                        if (user == null) {
                            return Users
                                .create({
                                    name: payload.name,
                                    email: payload.email,
                                    password: 'XXXXXX'
                                })
                                .then(user => {
                                    res.status(201).json({
                                        user: user._id,
                                        data: jwt.sign({
                                            id : user._id,
                                            email: user.email
                                        }, process.env.JWTSECRET)
                                    })
                                })
                        } else {
                            res.status(200).json({
                                user : user._id,
                                data: jwt.sign({
                                    id : user._id,
                                    email: user.email
                                }, process.env.JWTSECRET)
                            })
                        }

                    })


            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static tokenVerification(req, res) {
        try {
            let decoded = jwt.verify(req.body.token, process.env.JWTSECRET)
            Users
                .findOne({ email: decoded.email })
                .then(user => {
                    res.status(200).json({ message: 'token benar', action: true ,data : user})
                })
                .catch(err => {
                    res.status(500).json({ message: 'internal server error', error: err })
                })

        } catch (err) {
            res.status(402).json({ message: "you're not authorize for this session" })
        }
    }
    static getTranslate(req,res) {

        googleTranslate
            .translate(req.body.text, req.body.language, function(err, translation){
                if(err) {
                    res.status(500).json(err)
                } else {
                    res.status(200).json({data :translation.translatedText})
                }
            })
    }
}

module.exports = googleController
