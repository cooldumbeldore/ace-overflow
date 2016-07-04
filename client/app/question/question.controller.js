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
          console.log(this.question);
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

  class AnswerController {
    constructor($http, $scope, $stateParams) {
      this.$http = $http;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.test = "asdf";
    }

    $onInit() {
      this.test = "asdf";
      console.log("init was called");
    }

    sendAnswer() {
      console.log("yay");
      console.log($scope.answer);

      $scope.answer = {text: ""};
      $scope.answer.$setPristine();
      console.log($scope.answer);
    }

    addAnswer() {
      if (this.newQuestion) {
        this.$http.post('/api/questions/' + this.$stateParams.id +"/" , {
          name: this.newQuestion
        });
        this.newQuestion = '';
      }
    }

    deleteAnswer(question) {
      this.$http.delete('/api/questions/' + question._id);
    }
  }

  angular.module('aceOverflowApp')
    .component('question', {
      templateUrl: 'app/question/question.html',
      controller: QuestionController
    })
    .component('answercomp', {
      templateUrl: 'app/question/answerForm.html',
      controller: AnswerController
    });


})();
