'use strict';

(function() {

  class MainController {

    constructor($http, $scope, $state) {
      this.$http = $http;
      this.awesomeThings = [];
      console.log($scope);
      console.log($state);
    }

    $onInit() {
      console.log(this.user);
    }
  }

  angular.module('aceOverflowApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
