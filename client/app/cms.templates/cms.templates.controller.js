'use strict';

angular.module('appApp')
  .controller('CmsTemplatesCtrl', function ($scope, $http, socket, $routeParams, $location) {
	  	//gridster config
	  	$scope.maxcol = 12;
	  	$scope.potentialMaxCol = 12;
		$scope.getNumber = function(num){
			return new Array(num);
		}
		$scope.isMaxCol = function(num){
			if(num === $scope.maxcol){
				return true;
			}
		}


		$scope.elementCount = 0;
		$scope.gridContent = "";
		$scope.count = 0;
		$scope.sizex = 1;
		$scope.sizey = 1;
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
	        link: function (scope, element, attributes) {
				var gridster = 
					jQuery(".gridster ul").gridster({
						resize:{
							enabled: true
						},
						autogrow_cols: true,
				        widget_margins: [scope.margins.top, scope.margins.left],
				        widget_base_dimensions: [scope.baseDimensions.width, scope.baseDimensions.height]
				    }).data('gridster');

	            scope.updateGrid = function(){
					if(element.find("li").length === 0){
						alert("Please add an element first.");
						return false;
					}
					gridster.options.widget_base_dimensions = [scope.baseDimensions.width, scope.baseDimensions.height];
					gridster.options.widget_margins = [scope.margins.top, scope.margins.left];
					gridster.init();
					
					//data for db
				    var gData = jQuery(".gridster ul").gridster().data('gridster');
 					var gDataSerialized = gridster.serialize();
				}

				scope.createElement = function(){
					gridster.add_widget.apply(gridster, ["<li></li>", scope.sizex, scope.sizey])
				}
	        },
	        templateUrl: '/app/cms.templates/cms-templates-grid-template.html'
		}	
  });

