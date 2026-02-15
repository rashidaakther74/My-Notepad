const express = require('express');
const { handleCreateUser, handleGetAllUsers, handleGetSingleUser, handleUpdateUser, handleDeleteUser, handleLoginUser, }
 = require('../controllers/userController');
const { isAdmin, verifyToken } = require('../middlewares/auth');
const { loginUser } = require('../services/userServices');
const router = express.Router();

router.post("/create-user", handleCreateUser);
router.get("/", verifyToken, isAdmin, handleGetAllUsers);
router.get("/:id",verifyToken, handleGetSingleUser);
router.put("/:id",verifyToken, handleUpdateUser);
router.delete("/:id",verifyToken, handleDeleteUser);
router.post("/login", handleLoginUser);

module.exports = router;