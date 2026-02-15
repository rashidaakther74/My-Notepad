const createError = require("http-errors");
const {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
} = require("../services/noteService");
// CREATE
const handleCreateNote = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const note = await createNote({
      title,
      description,
      image: imageUrl,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note created",
      payload: note,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL
const handleGetNotes = async (req, res, next) => {
  try {
    const notes = await getAllNotes(req.user);
    res.json({ success: true, payload: notes });
  } catch (error) {
    next(error);
  }
};
const handleSingleNote = async (req, res, next) => {
  try {
    const note = await getSingleNote(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    // Only owner or admin can access
    if (!req.user.isAdmin && note.user.toString() !== req.user._id) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      message: "Single note fetched successfully",
      payload: note,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE
const handleUpdateNote = async (req, res, next) => {
  try {
    const note = await updateNote(req.params.id, req.body);

    res.json({
      success: true,
      message: "Note updated",
      payload: note,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE
const handleDeleteNote = async (req, res, next) => {
  try {
    await deleteNote(req.params.id);

    res.json({
      success: true,
      message: "Note deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateNote,
  handleGetNotes,
  handleSingleNote,
  handleUpdateNote,
  handleDeleteNote
};
