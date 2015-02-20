'use strict';

angular.module('appApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/cms/templates', {
        templateUrl: 'app/cms.templates/cms-templates.html',
        controller: 'CmsTemplatesCtrl'
      });
  });