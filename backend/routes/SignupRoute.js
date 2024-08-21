import express from 'express';
import bcrypt from 'bcrypt';
import LoginModel from '../models/LoginModel.js';

const signup_router = express.Router();

// Endpoint Sign Up
signup_router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
    LoginModel.query(query, [username, hashedPassword, role], (err, result) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to create account' });
      }
      res.json({ success: true });
    });
  } catch (error) {
    res.json({ success: false, message: 'An error occurred during sign up' });
  }
});

export default signup_router;