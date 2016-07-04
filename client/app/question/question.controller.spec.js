'use strict';

describe('Component: questionComponent', function() {

  // load the controller's module
  beforeEach(module('aceOverflowApp'));
  beforeEach(module('stateMock'));

  var scope;
  var questionComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/questions')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    questionComponent = $componentController('question', {
      $http: $http,
      $scope: scope
    });
  }));

  it('should attach a list of questions to the controller', function() {
    questionComponent.$onInit();
    $httpBackend.flush();
    expect(questionComponent.awesomeQuestions.length)
      .toBe(4);
  });
});
