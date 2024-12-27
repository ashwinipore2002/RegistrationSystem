const db = require('../models/db');

// GET: Retrieve all users
exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM registration';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        res.status(200).json(results);
    });
};

// GET: Retrieve a user by ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM registration WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(results[0]);
    });
};

// PUT: Update a user by ID
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, mobileNumber, updatedBy } = req.body;
    const query = `
        UPDATE registration
        SET first_name = ?, last_name = ?, mobile_number = ?, updated_by = ?, updated_date = NOW()
        WHERE id = ?
    `;
    db.query(query, [firstName, lastName, mobileNumber, updatedBy, id], (err, results) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully.' });
    });
};

// DELETE: Delete a user by ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM registration WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Database error.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    });
};
