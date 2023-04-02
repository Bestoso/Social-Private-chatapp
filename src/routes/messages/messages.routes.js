const { Router } = require('express');
const { getMessages, postMessages } = require('../../controllers/messages');

const router = Router();

router.get('/', getMessages);
router.post('/', postMessages);

module.exports = router;