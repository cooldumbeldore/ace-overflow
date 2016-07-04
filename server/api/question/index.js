'use strict';

var express = require('express');
var controller = require('./question.controller.js');

var router = express.Router();

router.get('/', controller.index);
router.get('/:questionId', controller.show);
router.post('/', controller.create);
router.put('/:questionId', controller.update);
router.patch('/:questionId', controller.update);
router.delete('/:questionId', controller.destroy);


router.get('/:questionId/answers/:answerId', controller.showAnswer);
router.post('/:questionId/', controller.createAnswer);
/*
router.put('/:questionId/answers/:answerId', controller.updateAnswer);
//router.patch('/:question_id/:answer_id', controller.update);
router.delete('/:questionId/answers/:answerId', controller.destroyAnswer);
*/

module.exports = router;
