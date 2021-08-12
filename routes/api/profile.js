const express = require('express')
const router = express.Router()

// @route- GET /api/profile
// @desc - List all profiles
// @access - Public
router.get('/', (req, res) => {
    return res.send('Profile Route')
})

module.exports = router