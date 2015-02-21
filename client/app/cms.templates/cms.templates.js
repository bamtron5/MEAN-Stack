'use strict';

angular.module('appApp')
  .config(function ($routeProvider, $locationProvider) {
  	$locationProvider.html5Mode(true);
    $routeProvider
      .when('/cms/templates', {
        templateUrl: 'app/cms.templates/cms-templates.html',
        controller: 'CmsTemplatesCtrl'
        //reloadOnSearch: false
      });
  });