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
          this.prismLang = "language-" + this.question.prog_lang;
        });

    }

    sendAnswer() {
      var answerObj = {
        text: this.$scope.answer.text
        //add posted by
      };
      this.addAnswer(answerObj);
      setTimeout(this.$onInit, 150);


    }

    addAnswer(answerObj) {
      if (answerObj) {
        this.$http.post('/api/questions/' + this.$stateParams.id + '/answers', answerObj);
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
    });


})();
