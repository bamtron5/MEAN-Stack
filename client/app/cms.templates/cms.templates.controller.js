'use strict';

angular.module('appApp')
  .controller('CmsTemplatesCtrl', function ($scope, $http, socket, $routeParams, $location) {
	  	//gridster config
	  	$scope.maxcol = 15;
		$scope.getNumber = function(num){
			return new Array(num);
		}
		$scope.isMaxCol = function(num){
			if(num === $scope.maxcol){
				return true;
			}
		}
		$scope.gridContent = "";
		$scope.count = 0;
		$scope.sizex = 0;
		$scope.sizey = 0;
		$scope.baseDimensions = {
			width: 140,
			height: 140
		}
		$scope.margins = {
			top: 10,
			left:10
		}

		//bootstrap modal for editing templates
		$scope.edit = false;
		$scope.openEditor = function(){
			$scope.edit = true;
			$('#edit-grid').modal('show');
		}


	  	//either show templates list or get template
	  	//depends on hash:id
	  	if($location.hash() === ''){
	  		$http.get('/api/cms.templates').success(function(cms) {
		      $scope.cms = cms;
		      socket.syncUpdates('cms', $scope.cms);
		    });
	  	} else {
	  		$http.get('/api/cms.templates/' + $location.hash()).success(function(template) {
		      $scope.template = template;
		      socket.syncUpdates('template', $scope.template);
		    }).
		    error(function(status, data, headers, config){
		    });
	  	}

	})


	.directive('editGrid', function(){
		return {
			restrict: 'C',
			///controller: 'CmsTemplatesCtrl',
	        link: function (scope, element, attributes) {
	            scope.createRow = function(){
					console.log(element);
					element.find(".gridster ul").remove();
					element.find(".gridster").append("<ul></ul>");
					element.find('ul').append('<li data-row="1" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="3" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="2" data-sizex="2" data-sizey="1"></li><li data-row="2" data-col="2" data-sizex="2" data-sizey="2"></li><li data-row="1" data-col="4" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="4" data-sizex="2" data-sizey="1"></li><li data-row="3" data-col="4" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="5" data-sizex="1" data-sizey="1"></li><li data-row="3" data-col="5" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="6" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="6" data-sizex="1" data-sizey="2"></li>');
					$(".gridster ul").gridster({
				        widget_margins: [scope.margins.top, scope.margins.left],
				        widget_base_dimensions: [scope.baseDimensions.width, scope.baseDimensions.height]
				    });
				    var gridster = $(".gridster ul").gridster().data('gridster');
 					var b = gridster.serialize();
 					console.log(b);
				} 
	        },
	        templateUrl: '/app/cms.templates/cms-templates-grid-template.html'
		}	
  });

