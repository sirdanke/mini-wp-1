const Tag = require('../models/tag')

function findOrCreateTags(req,res,next) {

    let data = JSON.parse(req.body.data)

    let promises = []
    data.tags.forEach(tag => {
        promises.push(
            Tag.findOneAndUpdate({ name : tag}, { $set: { name: tag }}, { upsert: true, new: true })
        )

    });
    Promise.all(promises)
        .then(data=> {
            req.tags = data.map(a => a._id)
            next()
            
        })
        .catch(err => {
            next(err)
        })
}

module.exports = findOrCreateTags