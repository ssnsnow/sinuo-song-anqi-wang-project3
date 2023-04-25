const mongoose = require("mongoose")

const UserSchema = require('./user.schema').UserSchema;

const UserModel = mongoose.model("UserModel", UserSchema);

function createUser(user) {
    return UserModel.create(user);
}

function attemptLogin(username, password) {
    return UserModel.findOne({ username: username, password: password }).exec();
}

function findUserByUsername(username) {
    return UserModel.findOne({username: username}).exec();
}

function findUserById(id) {
    return UserModel.findById(id).exec();
}

module.exports = {
    createUser,
    attemptLogin,
    findUserByUsername,
    findUserById,
}