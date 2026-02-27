import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = signToken({ id: user._id });
  return res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      planExpiry: user.planExpiry
    }
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken({ id: user._id });
  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      planExpiry: user.planExpiry,
      promptsUsedToday: user.promptsUsedToday
    }
  });
};

export const getProfile = async (req, res) => {
  return res.json({ user: req.user });
};
