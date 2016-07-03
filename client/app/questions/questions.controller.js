'use strict';

(function () {

  class QuestionsController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [];
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });

      /*
      this.awesomeThings = [
        {name:"asdf"}, {name:"asdf2"}, {name:"asdf3"}, {name:"asdf4"}
      ]
      */
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('aceOverflowApp')
    .component('questions', {
      templateUrl: 'app/questions/questions.html',
      controller: QuestionsController
    });
})();
