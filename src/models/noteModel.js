const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  title:{
  type: String,
  required: true },          
  description: {
  type: String,
  required: true },
  image: {
   type: String }, 
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
   required: true
 } 
},
{ timestamps: true });

const Note = model("Note", noteSchema);

module.exports = Note;
