'use strict';

(function () {

  class QuestionController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [];
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });

      this.title = "asdf";
      this.text = "my text";
      this.code = "var a = 5";

      this.answers = [
        {text: "answer 1"},
        {text: "answer 2"},
        {text: "answer 3"}

      ]

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
    .component('question', {
      templateUrl: 'app/question/question.html',
      controller: QuestionController
    });
})();
