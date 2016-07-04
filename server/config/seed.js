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
      code: 'var id = 0',
      answers: [
        {text:'answer0 to question0'},
        {text:'answer1 to question0'},
        {text:'answer2 to question0'},
        {text:'answer3 to question0'}
      ]
    }, {
      title: 'Question1',
      text: 'my text1',
      code: 'var id = 1',
      answers: [
        {text:'answer0 to question1'},
        {text:'answer1 to question1'},
        {text:'answer2 to question1'},
        {text:'answer3 to question1'}
      ]
    }, {
      title: 'Question2',
      text: 'my text2',
      code: 'var id = 2',
      answers: [
        {text:'answer0 to question2'},
        {text:'answer1 to question2'},
        {text:'answer2 to question2'},
        {text:'answer3 to question2'}
      ]
    }, {
      title: 'Question3',
      text: 'my text3',
      code: 'var id = 3',
      answers: [
        {text:'answer0 to question3'},
        {text:'answer1 to question3'},
        {text:'answer2 to question3'},
        {text:'answer3 to question3'}
      ]
    }, {
      title: 'Question4',
      text: 'my text4',
      code: 'var id = 4',
      answers: [
        {text:'answer0 to question4'},
        {text:'answer1 to question4'},
        {text:'answer2 to question4'},
        {text:'answer3 to question4'}
      ]
    }, {
      title: 'Question5',
      text: 'my text5',
      code: 'var id = 5',
      answers: [
        {text:'answer0 to question5'},
        {text:'answer1 to question5'},
        {text:'answer2 to question5'},
        {text:'answer3 to question5'}
      ]
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
