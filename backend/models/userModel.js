const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    location: {type: String, required: true},
    role: {type: String, enum: ["USER", "ADMIN"], default: "USER"}
    //dodac tablice produktow z innego modelu
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, role: this.role}, process.env.JWTPRIVATEKEY, {
        expiresIn: "1d"
    });
    return token;
}

const User = mongoose.model("User", userSchema);


module.exports = {User};