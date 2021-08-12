const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const User = require('../../models/User')

// @route- POST /api/users
// @desc - Register a user
// @access - Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please use a valid email').isEmail(),
    check('password', 'Password must be 6 characters long').isLength({
        min: 6
    })
], async (req, res) => {
    //Validate Bad Request
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password} = req.body
    try {
        //Check if user already exists
        let user = await User.findOne({email})
        console.log(user)
        if(user){
            res.status(400).json({
                errors: [{
                    msg: 'User already exists'
                }]
            })
        } else {
            user = new User({name, email, password})
            //Encrypt Password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            //Save user to DB
            await user.save()
            res.status(201).send('User Registered successfully')
        }
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
    
})

module.exports = router