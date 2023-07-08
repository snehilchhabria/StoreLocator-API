const express = require('express');
const { getStores } =require('../controllers/stores');

const router = express.Router();
router.route('/').get(getStores);

router.get('/', (req,res) => {
    res.send('Hello');
});

module.exports = router;