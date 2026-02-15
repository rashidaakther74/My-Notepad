const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const { handleCreateNote, handleGetNotes, handleSingleNote, handleUpdateNote, handleDeleteNote } = require("../controllers/noteController");
const { verifyToken } = require("../middlewares/auth");

router.post("/",verifyToken, upload.single("image"), handleCreateNote);

router.get("/",verifyToken, handleGetNotes);

router.get("/:id",verifyToken, handleSingleNote);


router.put("/:id",verifyToken,  handleUpdateNote);

router.delete("/:id",verifyToken, handleDeleteNote);

module.exports = router;
