'use strict';

(function () {

  class QuestionController {

    constructor($http, $scope, $stateParams) {
      this.$http = $http;
      this.question = null;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
    }

    $onInit() {
      this.$http.get('/api/questions/' + this.$stateParams.id)
        .then(response => {
          this.question = response.data;
          this.question.answers = [
            {text: "answer 1"},
            {text: "answer 2"},
            {text: "answer 3"}

          ]
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
    .component('question', {
      templateUrl: 'app/question/question.html',
      controller: QuestionController
    });
})();
