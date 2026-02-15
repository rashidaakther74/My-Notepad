const port = process.env.SERVER_PORT;
const mongodburl = process.env.MONGODB_ATLAS_URL;
const jwtAccessKey = process.env.JWT_SECRET_KEY;

module.exports = {port, mongodburl,jwtAccessKey }