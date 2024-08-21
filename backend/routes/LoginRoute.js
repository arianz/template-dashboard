import express from 'express';
import LoginModel from '../models/LoginModel.js';
import bcrypt from 'bcrypt';

const login_router = express.Router();

// Endpoint Login
login_router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? LIMIT 1';

    LoginModel.query(query, [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const user = results[0];

            // Verifikasi password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;

                if (isMatch) {
                    res.json({
                        success: true,
                        user: {
                            id: user.id,
                            username: user.username,
                            role: user.role,
                        }
                    });
                } else {
                    res.json({ success: false, message: 'Invalid password' });
                }
            });
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    });
});

export default login_router;