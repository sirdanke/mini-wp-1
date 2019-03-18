
require('dotenv').config()
const Posting = require('../models/postings')

function isAuthor(req,res,next) {
    try {
        Posting
            .findOne({ _id : req.params.id })
            .then(project => {
                
                if(project.author == req.user) {
                    next()
                } else {
                    res.status(402).json({message : 'not authorize'})
                }
            })
            .catch(err => {
                res.status(500).json({ message: 'internal server error', error: err })
            })

    } catch (err) {
        res.status(402).json({ message: "you're not authorize for this session" })
    }
}

module.exports = isAuthor