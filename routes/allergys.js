const router = require('express').Router()
const { getAllergys, deleteAllergy, addAllergy } = require('../controllers/allergy')

router.get('/:id', getAllergys)

router.delete('/:id', deleteAllergy)

router.post('/', addAllergy)


module.exports = router