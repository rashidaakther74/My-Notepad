require("dotenv").config()
const noteRouter = require("./routers/noteRouter");
const express = require("express");
const createError = require("http-errors");
const userRouter = require('./routers/userRouter')

const { port, mongodburl } = require("./secret"); 
const connectDB = require("./config/db");
const { errorResponse } = require("./controllers/responseController");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/notes", noteRouter);
app.use("/uploads", express.static("public/uploads"));

// client error
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});
// server error
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  await connectDB(mongodburl)
});

