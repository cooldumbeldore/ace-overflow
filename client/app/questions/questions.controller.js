'use strict';

(function () {

  class QuestionsController {

    constructor($http) {
      this.$http = $http;
      this.questions = [];
    }

    $onInit() {
      this.$http.get('/api/questions')
        .then(response => {
          this.questions = response.data;
          for(var i = 0; i< this.questions.length; i++){
            this.questions[i].path="/question/" + this.questions[i]._id;
          }
        });

    }

    addQuestion() {
      if (this.newQuestion) {
        this.$http.post('/api/questions', {
          name: this.newQuestion
        });
        this.newQuestion = '';
      }
    }

    deleteQuestion(question) {
      this.$http.delete('/api/questions/' + question._id);
    }
  }

  angular.module('aceOverflowApp')
    .component('questions', {
      templateUrl: 'app/questions/questions.html',
      controller: QuestionsController
    });
})();
