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

     this.$http.get('/api/tags')
          .then(response => {
            this.avialableTags = response.data;
      });

    }

    reload(){
      this.$onInit();
      $("textarea").val('');
    }

    sendQuestion() {
      if(!this.$scope.question.text || !this.$scope.question.title){
        alert("Must enter question title and question text!");
      }else if(this.Auth.isLoggedIn()){
        var tagText = this.$scope.question.tags;
        var tags = tagText.split(' ');
        var uniqueTags = tags.filter(function(item, pos) {
            return tags.indexOf(item) == pos;
        })
        var tagIds = [];
        var matched = [];
        for(var i = 0; i < this.avialableTags.length; i++){
          for(var j = 0; j < uniqueTags.length; j++){
            if(this.avialableTags[i].text == uniqueTags[j]){
              tagIds.push(this.avialableTags[i]._id);
              matched.push(uniqueTags[j]);
            }
          }
        }
        var missingTags = uniqueTags.filter(function(item){
          return matched.indexOf(item) == -1;
        });

        console.log(missingTags.length);
        if(missingTags.length != 0 ){
          alert('Invalid tags: ' + missingTags);
          return;
        }

        var user = this.Auth.getCurrentUser();
        var questionObj = {
        text: this.$scope.question.text,
        title: this.$scope.question.title,
        code: this.$scope.question.code,
        prog_lang: this.$scope.question.prog_lang,
        postedBy: user._id,
        tags: tagIds
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
