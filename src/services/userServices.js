const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const createUser = async (name, email, password) => {

  
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  
  const user = await User.create({
    name,
    email,
    password, 
               
  });

  return user;
};

const getAllUsers = async () => {
    const users = await User.find().select('-password');
    return users;
}
const getSingleUser = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
const updateUser = async(id, updateData)=>{
    const user = await User.findByIdAndUpdate(
        id,
        updateData,
        {new: true, runValidators:true}
    ).select('-password');
     if (!user) {
    throw new Error("User not found");
  }

  return user;
}
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
const loginUser = async (email, password) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user;
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  loginUser,
};
