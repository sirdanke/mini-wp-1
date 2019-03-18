const mongoose = require('mongoose')
const {encrypt} = require('../helpers/encrypt')
const Schema = mongoose.Schema


const userSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    email : { 
        type : String,
        lowercase : true,
        required: 'email required',
        validate : [{
            validator(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
                },
                message : 'invalid email format'
            },
            {
                isAsync : true,
                validator : function(v,cb) {
                User
                    .findOne({
                        email : v
                    })
                    .then(user => {
                        if(user && user._id != this._id) {
                            console.log('masuk sini validasi');
                            
                            cb(false)
                        } else {
                            cb(true)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        
                        throw err
                    })
            }, message : 'email has already used'
        }]
    },
    password : {
        type :String,
        required : true
    },
    profilePicture : {
        type :String,
        default : 'https://storage.googleapis.com/mini-wp-storage-multer/1550383407423gender-neutral-user.png'
    },
    postings : [{ type: Schema.Types.ObjectId, ref: 'Posting' }]
},{ timestamps : true})


userSchema.pre('save', function (next) {
    try {
        var user = this;
        if (!user.isModified('password')) return next();
        encrypt(user, function (err, hash) {
            if (err) {
                next(err)
            } else {
                user.password = hash;
                next();
            }
        })
    } catch (err) {
        next(err)
        console.log(err);

    }

});

const User = mongoose.model('User', userSchema)
module.exports = User