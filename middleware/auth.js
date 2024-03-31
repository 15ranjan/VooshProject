// middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Corrected variable name

const auth = async (req, res, next) => {
  console.log(req.header('Authorization'));
  // console.log(process.env.JWT_SECRET);
  const token = req.header('Authorization').replace('Bearer ', '');
  console.log("token: " + token);

  try {
    const jwtTokenVal = '5G#j2r@Fp$Vs7qN!';
    const decoded = jwt.verify(token, jwtTokenVal);
    // console.log("decode: " + decoded.key[0]);
    console.log(decoded.id);
    const foundUser = await User.findOne({ _id: decoded.id }); // Corrected method name

    if (!foundUser) {
      throw new Error();
    }

    req.user = foundUser;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth;

