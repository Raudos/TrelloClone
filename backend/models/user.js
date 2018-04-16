const mongoose = require('mongoose');


// TODO

const UserSchema = new mongoose.Schema({

})

const User = mongoose.model('User', UserSchema);

module.exports = { User, UserSchema };
