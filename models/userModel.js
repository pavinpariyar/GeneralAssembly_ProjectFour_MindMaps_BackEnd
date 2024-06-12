const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Name is empty'] },
    email: { type: String, required: [true, 'Email is empty'], unique: [true, 'Email already exists'] },
    password: { type: String, required: [true, 'Password is empty'] },
}, { timestamps: true })

module.exports = mongoose.model('Users', UserSchema)