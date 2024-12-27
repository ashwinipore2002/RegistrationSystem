const bcrypt = require('bcrypt');
const db = require('../models/db');

exports.registerUser = async (req, res) => {
    const { firstName, lastName, mobileNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'CALL InsertRegistration(?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, mobileNumber, hashedPassword, 'Admin'], (err) => {
        if (err) return res.status(500).json({ error: 'Database error.' });
        res.status(201).json({ message: 'User registered successfully!' });
    });
};
