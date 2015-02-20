'use strict';

describe('Controller: CmsTemplatesCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var CmsTemplatesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CmsTemplatesCtrl = $controller('CmsTemplatesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
