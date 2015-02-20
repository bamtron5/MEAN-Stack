'use strict';

angular.module('appApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $http, socket) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $http.get('/api/cms').success(function(cms) {
      $scope.cms = cms;
      socket.syncUpdates('cms', $scope.cms);
    });

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });