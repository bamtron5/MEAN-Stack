'use strict';

angular.module('appApp')
  .controller('CmsTemplatesCtrl', function ($scope, $http, socket, $routeParams, $location) {

  	if($location.hash() === ''){
  		console.log($location.hash());
  		$http.get('/api/cms.templates').success(function(cms) {
	      $scope.cms = cms;
	      socket.syncUpdates('cms', $scope.cms);
	    });
  	} else {
  		$http.get('/api/cms.templates/' + $location.hash()).success(function(template) {
	      $scope.template = template;
	      socket.syncUpdates('template', $scope.template);
	    });
  		console.log($location.hash());
  	}
  });
