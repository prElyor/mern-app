const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: ''},
    ip: {type: String, default: ''},
    clientAddress: {type: String, default: ''},
    links: [{type: Types.ObjectId, ref: 'Link'}],
    files: [{type: Types.ObjectId, ref: 'Files'}]
})

module.exports = model('User', schema)