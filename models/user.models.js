const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
 username:{
     type:String,
     required:true
 },
 password:{
     type:String,
     required:true
 },
 notes_array:{
     type:Array
 }
},{timestamps:true});

const user = mongoose.model("user",user_schema);

module.exports = user;