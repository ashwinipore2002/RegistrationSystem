const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

// GET: Retrieve all users
router.get('/', getAllUsers);

// GET: Retrieve a user by ID
router.get('/:id', getUserById);

// PUT: Update a user by ID
router.put('/:id', updateUser);

// DELETE: Delete a user by ID
router.delete('/:id', deleteUser);

module.exports = router;
