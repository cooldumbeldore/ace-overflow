/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Question from '../api/question/question.model';
import User from '../api/user/user.model';

Question.find({}).remove()
  .then(() => {
    Question.create({
      title: 'Question0',
      text: 'my text0',
      code: 'var id = 0'
    }, {
      title: 'Question1',
      text: 'my text1',
      code: 'var id = 1'
    }, {
      title: 'Question2',
      text: 'my text2',
      code: 'var id = 2'
    }, {
      title: 'Question3',
      text: 'my text3',
      code: 'var id = 3'
    }, {
      title: 'Question4',
      text: 'my text4',
      code: 'var id = 4'
    }, {
      title: 'Question5',
      text: 'my text5',
      code: 'var id = 5'
    });
  });

User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
    .then(() => {
      console.log('finished populating users');
    });
  });
