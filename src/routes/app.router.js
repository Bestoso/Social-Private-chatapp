const { Router } = require('express');

const router = Router();

router.use('/users', require('./users/users.routes'))
router.use('/messages', require('./messages/messages.routes'))

module.exports = router;