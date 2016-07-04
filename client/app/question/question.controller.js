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
    constructor($http, $scope, $stateParams, $route) {
      this.$http = $http;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.$route = $route;
    }

    $onInit() {
    }

    sendAnswer() {
      var answerObj = {
        text: this.$scope.answer.text
        //add posted by
      };
      this.addAnswer(answerObj);
    }

    addAnswer(answerObj) {
      if (answerObj) {
        this.$http.post('/api/questions/' + this.$stateParams.id + '/answers', answerObj)
          .then(function(){
            console.log("yay");
            this.$route.reload();
          });
      }
    }

    deleteAnswer(answerObj) {
      this.$http.delete('/api/questions/' + this.$stateParams.id + '/answers/' + answerObj.id);
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
