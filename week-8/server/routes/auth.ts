import jwt from "jsonwebtoken";
import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/";
import { User } from "../db";
import { string, z } from 'zod';

const router = express.Router();


const loginInputs = z.object({
  username: string().min(3),
  password: string().min(4)
})
  
router.post('/signup', async (req, res) => {
  const zodAuth = loginInputs.safeParse(req.body);
  if (!zodAuth.success) {
    return res.status(401).json({
      error: zodAuth.error.message,
      message: 'invalid user credentials !'
    })
  }

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers["userId"];
      const user = await User.findOne({ _id: userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  export default router
