'use strict';

(function() {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [];
    }

    $onInit() {
    }
  }

  angular.module('aceOverflowApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
