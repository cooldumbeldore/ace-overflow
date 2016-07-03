'use strict';

angular.module('aceOverflowApp', ['aceOverflowApp.auth', 'aceOverflowApp.admin',
    'aceOverflowApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'ui.bootstrap', 'validation.match'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  });
