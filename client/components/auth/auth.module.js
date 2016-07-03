'use strict';

angular.module('aceOverflowApp.auth', ['aceOverflowApp.constants', 'aceOverflowApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
