const express = require('express')
const router = express.Router()
const { getTest, createTest, updateTest, deleteTest } = require("../controller/testController")

router.route('/').get(getTest).post(createTest)
router.route('/:id').put(updateTest).delete(deleteTest)

module.exports = router