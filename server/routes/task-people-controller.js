const express = require('express');
const router = express.Router();

const {createPeople, readPeople} = require('../controllers/tasks');

// People
router.get('/', readPeople);
router.post('/', createPeople);

module.exports = router;