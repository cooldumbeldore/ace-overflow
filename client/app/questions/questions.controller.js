'use strict';

(function () {

  class QuestionsController {

    constructor($http, $scope) {
      this.$http = $http;
      this.$scope = $scope;
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

    sendQuestion() {
      var questionObj = {
        text: this.$scope.question.text,
        title: this.$scope.question.title,
        code: this.$scope.question.code,
        prog_lang: this.$scope.question.prog_lang
        //add posted by
      };
      this.addQuestion(questionObj);
      setTimeout(this.$onInit, 150);

    }

    addQuestion(questionObj) {
      if (questionObj) {
        this.$http.post('/api/questions/', questionObj);
      }
    }


    deleteQuestion(questionObj) {
      this.$http.delete('/api/questions/' + questionObj.id);
    }
  }

  angular.module('aceOverflowApp')
    .component('questions', {
      templateUrl: 'app/questions/questions.html',
      controller: QuestionsController
    });
})();
