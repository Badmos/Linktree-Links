const express = require('express')
const router = express.Router();

const { userSchema } = require('../models/users')

const userController = (req, res) => {
    return res.status(200).json({
        status: 'success',
        message: 'Users successfully fetched',
        data: userSchema
    })
}

router.get('/', userController);

module.exports.fetchUsersRouter = router;