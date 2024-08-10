const express = require('express')
const router = express.Router()
const { getTest, createTest, updateTest, deleteTest } = require("../controller/testController")

// Protect the routess. Authenticated users only
const {protect} = require('../middleware/authMiddleWare')

router.route('/').get(protect, getTest).post(protect, createTest)
router.route('/:id').put(protect, updateTest).delete(protect, deleteTest)

module.exports = router