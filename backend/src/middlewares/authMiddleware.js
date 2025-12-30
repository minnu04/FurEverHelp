import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    try {
      const token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      if (!user) return res.status(401).json({ message: 'Token invalid' });
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalid' });
    }
  }
  return res.status(401).json({ message: 'No token provided' });
};

export default authMiddleware;