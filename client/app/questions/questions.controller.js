'use strict';

(function () {

  class QuestionsController {

    constructor($http, $scope, Auth) {
      this.$http = $http;
      this.$scope = $scope;
      this.questions = [];
      this.Auth = Auth;
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

    reload(){
      this.$onInit();
    }

    sendQuestion() {
      if(!this.$scope.question.text || !this.$scope.question.title){
        alert("Must enter question title and question text!");
      }else if(this.Auth.isLoggedIn()){
        var user = this.Auth.getCurrentUser();
        var questionObj = {
        text: this.$scope.question.text,
        title: this.$scope.question.title,
        code: this.$scope.question.code,
        prog_lang: this.$scope.question.prog_lang,
        postedBy: user._id
        };
        this.addQuestion(questionObj);
        setTimeout(this.reload(),100);
      }else{
        alert("Only logged in users can submit questions.");
      }
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
