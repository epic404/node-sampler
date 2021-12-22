const express = require('express');
const router = express.Router();
const dataRouter = require('./data.router');

router.use('/data', dataRouter);
router.use('/', (req, res) => res.sendStatus(404));

module.exports = router;