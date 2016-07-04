'use strict';

angular.module('aceOverflowApp')
  .config(function($stateProvider) {
    $stateProvider.state('question', {
      url: '/question/:id',
      template: '<question></question>'
    });
  });
