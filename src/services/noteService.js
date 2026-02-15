const Note = require("../models/noteModel");

// CREATE
const createNote = async (data) => {
  return await Note.create(data);
};

// GET ALL
const getAllNotes = async (user) => {
  if (user.isAdmin) {
    return await Note.find().populate("user", "name email");
  } else {
    return await Note.find({ user: user._id });
  }
};

// GET SINGLE
const getSingleNote = async (id) => {
  return await Note.findById(id);
};

// UPDATE
const updateNote = async (noteId, data) => {
  const updatedNote = await Note.findByIdAndUpdate(
    noteId,
    data,
    { 
     returnDocument: 'after',
     runValidators: true }
  );
  return updatedNote;
};

// DELETE
const deleteNote = async (id) => {
  return await Note.findByIdAndDelete(id);
};

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};
