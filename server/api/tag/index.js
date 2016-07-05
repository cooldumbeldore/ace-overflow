'use strict';

var express = require('express');
var controller = require('./tag.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:tagId', controller.show);
router.post('/', controller.create);
router.put('/:tagId', controller.update);
router.patch('/:tagId', controller.update);
router.delete('/:tagId', controller.destroy);

module.exports = router;
