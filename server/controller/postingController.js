const Posting = require('../models/postings')
const Tag = require('../models/tag')
const User = require('../models/users')

class postingController {
    static create(req, res) {
        
        let data = JSON.parse(req.body.data)

        Posting
            .create({
                title: data.title,
                posting: data.posting,
                image: req.file.cloudStoragePublicUrl,
                author: req.user,
                tags: req.tags,
                text : data.text,
                category : data.category
            })
            .then(post => {
                return Posting
                    .find({})
                    .populate('author')
                    .populate('tags') 
            })
            .then(post => { 
                res.status(201).json(post)
            })
            .catch(err => {
                console.log(err);
                
                res.status(500).json(err)
            })
    }

    static findAll(req, res) {
        Posting
            .find().sort({ _id: -1 })
            .skip(Number(req.headers.page)*9)
            .limit(Number(req.headers.limit))
            .populate('author')
            .populate('tags')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let data = JSON.parse(req.body.data)
        if (req.file) {
            data.image = req.file.cloudStoragePublicUrl
        }
        Posting
            .findOneAndUpdate({
                _id: req.params.id
            }, {
                    $set:
                    {
                        title: data.title,
                        posting: data.posting,
                        image: data.image,
                        tags: req.tags,
                        text : data.text,
                        category : data.category

                    }
                }, {
                    new: true
                })
            .then(data => {
                return Posting
                .find({})
                .populate('author')
                .populate('tags') 

            })
            .then(data => {
                res.status(200).json(data)

            })
            .catch(err => {
                console.log(err);

                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        Posting
            .findOneAndDelete({
                _id: req.params.id
            })
            .then(() => {
                return Posting
                    .find({})
                    
            })
            .then(data => {
                    res.status(200).json(data)

            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static findByAuthor(req, res) {
        User
            .find({
                _id: req.user
            })
            .populate('postings')
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = postingController