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

      this.$http.get('/api/tags')
          .then(response => {
            this.avialableTags = response.data;
      });
    }

    reload(){
      this.$onInit();
      $("textarea").val('');
    }

    toShowAddTags(){
      if(!this.Auth.isLoggedIn()){
        return false;
      }
      if(!this.question){
        return false;
      }
      if(!this.question.postedBy){
        return false;
      }
      if(this.question.postedBy._id != this.Auth.getCurrentUser()._id){
        return false;
      }
      return true;
    }

    updateQuestion(){
      if(!tagText){
        alert('Must Enter tags');
        return;
      }
      var tagText = this.form.tags;
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

      if(missingTags.length != 0 ){
        alert('Invalid tags: ' + missingTags);
        return;
      }

      for(var i = 0; i < this.question.tags.length; i++){
        for(var j = 0; j < uniqueTags.length; j++){
          if(this.question.tags[i].text == uniqueTags[j]){
            alert('tag ' + this.question.tags[i].text + ' already exists');
            return;
          }
        }
      }

      for(var i=0; i<this.question.tags.length; i++){
        tagIds.push(this.question.tags[i]._id);
      }

      var updatedQuestion = {
      text: this.question.text,
      title: this.question.title,
      code: this.question.code,
      prog_lang: this.question.prog_lang,
      postedBy: this.question.postedBy._id,
      tags: tagIds
      };
      this.$http.put('/api/questions/' + this.question._id, updatedQuestion);
      setTimeout(this.reload(),100);
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
