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


      this.questions = [
        {title:"asdf", id:0, path:"#/question/0"},
        {title:"q1", id:1, path:"#/question/1"},
        {title:"q2", id:2, path:"#/question/2"},
        {title:"q3", id:3, path:"#/question/"}
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
    .component('questions', {
      templateUrl: 'app/questions/questions.html',
      controller: QuestionsController
    });
})();
