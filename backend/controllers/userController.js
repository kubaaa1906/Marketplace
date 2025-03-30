const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require("../models/userModel");
const passwordComplexity = require("joi-password-complexity");

exports.registerUser = async(req, res) => {
    try{
        const {error} = validate(req.body);
        let user = await User.findOne({username: req.body.username});
        if(user){
            return res.status(400).json({ message: "User with this username already exist!"});
        }
        let userEmail = await User.findOne({email: req.body.email});
        if(userEmail){
            return res.status(400).json({ message: "User with this email already exist!"});
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({ ...req.body, password: hashPassword});
        await newUser.save();

    } catch (error){
        return res.status(500).json({ message: "Server Error"})
    }
}

exports.loginUser = async (req, res) => {
    try{
        const {error} = validateLogin(req.body)
        if(error){
            return res.status(400).send({ message: "Login Error"});
        }

        const user = await User.findOne({ username: req.body.username });
        if(!user){
            return res.status(400).send({ message: "Account with this username doesn`t exist"});
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if(!validPassword){
            return res.status(400).send({ message: "Invalid username or password!" });
        }

        const token = user.generateAuthToken();
        res.status(200).send({data: token, message: "Login successfull"})
    } catch (error){
        return res.status(500).json({message: "Server Error"});
    }
}

const validateLogin = (data) => {
    const schemaData = Joi.object({
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
    })
    return schemaData.validate(data);
}

const validate = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("Username"),
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password"),
        phoneNumber: Joi.number().required().label("Phone Number"),
        location: Joi.string().required().label("Location")
    });
    return schema.validate(data);
}
