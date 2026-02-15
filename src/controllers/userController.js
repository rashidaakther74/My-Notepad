const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser, loginUser, }
 = require("../services/userServices");
const { successResponse } = require("./responseController");
const { jwtAccessKey } = require("../secret");

const handleCreateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await createUser(name, email, password);

return successResponse(res, {
      statusCode: 200,
      message: "User create successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
const handleGetAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {
    next(error);
  }
};

const handleGetSingleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const loggedInUserId = req.user.userId;

    if (id !== loggedInUserId && !req.user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this user",
      });
    }

    const user = await getSingleUser(id);

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });

  } catch (error) {
    next(error);
  }
};
  
const handleUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUser = await updateUser(id, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    next(error);
  }
};
const handleDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });

  } catch (error) {
    next(error);
  }
};
const handleLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await loginUser(email, password);
    if (!user) throw createError(401, "Invalid credentials");

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      jwtAccessKey,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "User log in successfully",
      user: {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  },
  token,
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  handleCreateUser,
  handleGetAllUsers,
  handleGetSingleUser,
  handleUpdateUser,
  handleDeleteUser,
  handleLoginUser,
};