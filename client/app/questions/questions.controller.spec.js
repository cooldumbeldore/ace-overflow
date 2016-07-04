'use strict';

describe('Component: questionsComponent', function() {

  // load the controller's module
  beforeEach(module('aceOverflowApp'));
  beforeEach(module('stateMock'));

  var scope;
  var questionsComponent;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/questions')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    questionsComponent = $componentController('questions', {
      $http: $http,
      $scope: scope
    });
  }));

  it('should attach a list of questions to the controller', function() {
    questionsComponent.$onInit();
    $httpBackend.flush();
    expect(questionsComponent.questions.length)
      .toBe(4);
  });
});
