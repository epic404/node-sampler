const express = require('express');
const { dataController } = require('../controllers');
const router = express.Router();

router.get('/:repository/:objectId', dataController.getObject);
router.put('/:repository', dataController.putObject);
router.delete('/:repository/:objectId', dataController.deleteObject);

module.exports = router;