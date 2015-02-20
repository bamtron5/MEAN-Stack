'use strict';

angular.module('appApp')
  .controller('CmsTemplatesCtrl', function ($scope, $http, socket) {
    $http.get('/api/cms.templates').success(function(cms) {
      $scope.cms = cms;
      socket.syncUpdates('cms', $scope.cms);
      console.log($scope);
    });

    $scope.message = "hello";
  });
