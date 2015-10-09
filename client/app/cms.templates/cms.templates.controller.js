'use strict';

angular.module('appApp')
  .controller('CmsTemplatesCtrl', function ($scope, $http, socket, $routeParams, $location, $resource) {
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
			width: 83,
			height: 83
		}
		$scope.margins = {
			top: 10,
			left:10
		}
		$scope.widgetCount = 0;

		//bootstrap modal for editing templates
		$scope.edit = false;
		$scope.openEditor = function(){
			if($scope.template.templateJson){
				$scope.initGrid();
			}
			$scope.edit = true;
			$('.edit-modal').show();
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

	  	$scope.saveGrid = function(gridJson){
	  		$http.put('/api/cms.templates/' + $location.hash(), {templateJson:gridJson}, {
		        templateJson:gridJson
		    });
	  	}

	  	$scope.initGrid = function(gridJson){
	  		if($scope.template){
	  			for(var x = 0; x < $scope.template.templateJson.length; x++){
	  				var count = x + 1;
					gridster.add_widget.apply(gridster, ["<li><span class='widget_id'>" + count + "</span></li>", $scope.template.templateJson[x].size_y, $scope.template.templateJson[x].size_x])
	  			};
	  		}
	  	}

	})


	.directive('editGrid', function(){
		return {
			restrict: 'C',
	        link: function (scope, element, attributes) {
				window.gridster = 
					jQuery(".gridster ul").gridster({
						resize:{
							enabled: true
						},
						max_cols: 12,
						autogrow_cols: true,
				        widget_margins: [scope.margins.top, scope.margins.left],
				        widget_base_dimensions: [scope.baseDimensions.width, scope.baseDimensions.height]
				    }).data('gridster');

			    scope.initGrid();

	            scope.updateGrid = function(){
					if(element.find("li").length === 0){
						alert("Please add an element first.");
						return false;
					}

					// gridster.options.widget_base_dimensions = [scope.baseDimensions.width, scope.baseDimensions.height];
					// gridster.options.widget_margins = [scope.margins.top, scope.margins.left];
					// gridster.destroy();
					//gridster.init().data('gridster');
					
					//data for db
				    var gData = jQuery(".gridster ul").gridster().data('gridster');
 					var gDataSerialized = gridster.serialize();
 					console.log(gridster.serialize());
 					scope.saveGrid(gDataSerialized);
				}

				scope.createElement = function(){
					scope.widgetCount++;
					console.log(gridster.serialize());
					gridster.add_widget.apply(gridster, ["<li><span class='widget_id'>" + scope.widgetCount + "</span></li>", scope.sizex, scope.sizey])
				}
	        },
	        templateUrl: '/app/cms.templates/cms-templates-grid-template.html'
		}	
  });

