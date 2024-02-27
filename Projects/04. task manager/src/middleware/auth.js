// This function will run in the middle of request and routhing

// Request =====>   Middleware   ======>  Routing

const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "task-manager");

    // find the user with correct id and who has the token inside the token array
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    // setting current token
    req.token = token;

    // Setting current user
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: `please Authenticate` });
  }
};

module.exports = auth;
