import jwt from 'jsonwebtoken';

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

export default (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;
  if (!token) {
    return res.json({
      success: false,
      message: 'Unauthorized access',
    });
  }
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    return jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Invalid access token',
        });
      }
      req.decoded = decoded;
      return next();
    });
  }
  return res.json({
    success: false,
    message: 'Auth token is not supplied',
  });
};
