const { Router } = require('express');
const { getUsers, getUsersById, createUsers, updateUsers, deleteUsers } = require('../../controllers/users');

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.post('/', createUsers);
router.put('/:id', updateUsers);
router.delete('/:id', deleteUsers);

module.exports = router;