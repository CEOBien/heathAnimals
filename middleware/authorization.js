const User = require('../models/userSchame');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const checkRole = (role) => {
  
    return async (req, res, next) => {
      try {
            // Get the user's ID from the JWT
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
          const userId = decodedToken.id;
          
          if (!token)
          return res
            .status(401)
            .json({ success: false, message: 'Access token not found' })
          // Find the user in the database and check their role
          const user = await User.findById(userId);
          if (!user) {
            throw new Error('User not found!!!!!');
          }
          if (!role.includes(user.role)) {
            throw new Error('Unauthorized');
          }

          // Call the next middleware function
          next();
        
      } catch (err) {
        return res.status(500).json({ message: err.message });
      }
    }
  }



module.exports = {checkRole};