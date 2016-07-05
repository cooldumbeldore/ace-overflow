'use strict';

(function () {

  class QuestionController {

    constructor($http, $scope, $stateParams, Auth) {
      this.$http = $http;
      this.question = null;
      this.$scope = $scope;
      this.$stateParams = $stateParams;
      this.Auth = Auth;
    }

    $onInit() {
      this.$http.get('/api/questions/' + this.$stateParams.id)
        .then(response => {
          this.question = response.data;
          console.log(this.question);
          this.prismLang = "language-" + this.question.prog_lang;
        });

    }

    reload(){
      this.$onInit();
    }

    sendAnswer() {
      if(!this.$scope.answer){
        alert("Must enter answer text!");
      }else if(this.Auth.isLoggedIn()){
        var user = this.Auth.getCurrentUser();
        var answerObj = {
          text: this.$scope.answer.text,
          postedBy: user._id
        };
        this.addAnswer(answerObj);
        setTimeout(this.reload(),100);
      }else{
        alert("Only logged in users can submit answers.");
      }
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
