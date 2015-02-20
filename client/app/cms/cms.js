'use strict';

angular.module('appApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cms', {
        templateUrl: 'app/cms/cms.html',
        controller: 'CmsCtrl'
      });
  });