const mongoose = require("mongoose");

const Users = new mongoose.Schema({

    name: { type: String,required: true,},
    username: { type: String,required: true,},
    email: { type: String, required: true, maxLength: 50, unique: true },
    password: { type: String, required: true, maxLength: 150, minLength: 6 },
    language: { type: String},
    picture: { type: String,default:"user.svg"},
    recovery_token:{ type: String},


},{
    timestamps:true
})

module.exports = mongoose.model("Users", Users);