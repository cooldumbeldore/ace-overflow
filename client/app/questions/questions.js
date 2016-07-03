'use strict';

angular.module('aceOverflowApp')
  .config(function($stateProvider) {
    $stateProvider.state('questions', {
      url: '/questions',
      template: '<questions></questions>'
    });
  });
