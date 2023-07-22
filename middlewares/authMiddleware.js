import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userID = decodedToken.userID;

    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'failed', message: 'Unauthorized' });
  }
};

export default authMiddleware;
