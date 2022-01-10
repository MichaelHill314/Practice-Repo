const router = require('express').Router()
const { getUsers, getUserById, destroyUser } = require('../controllers/user')

router.get('/', getUsers)

router.get('/:id', getUserById)

router.delete('/:id', destroyUser)


module.exports = router