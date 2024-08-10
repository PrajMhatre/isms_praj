const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Routes for users
router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.put('/:userid', usersController.updateUser); // Update a user
router.delete('/:userid', usersController.deleteUser); // Delete a user

module.exports = router;
