'use strict';

angular.module('appApp')
  .controller('CmsTemplatesCtrl', function ($scope, $http, socket, $routeParams, $location) {
	  	//gridster ctrl
	  	$scope.maxcol = 15;
		$scope.row = 0; 
		$scope.getNumber = function(num){
			return new Array(num);
		}


		//bootstrap modal and location edit search params
		$scope.edit = false;
	  	$scope.isEditOpen = function(){
	  		if(!$location.search('edit') || $location.search('edit') != 'open'){ 
	  			$scope.edit = false;
	  		} else { 
				$scope.edit = true;
			}
		};

	  	if($scope.edit){
	  		$location.search('edit','open');
	  		$('#edit-grid').modal('show');
	  	}

		$scope.openEditor = function(){
			$scope.edit = true;
			$location.search('edit','open');
			//$('#edit-grid').modal('show');
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
			controller: 'CmsTemplatesCtrl',
	        link: function (scope, element, attributes) {
	            scope.createRow = function(){
					//console.log(element);
					element.find('ul').append('<li data-row="1" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="3" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="2" data-sizex="2" data-sizey="1"></li><li data-row="2" data-col="2" data-sizex="2" data-sizey="2"></li><li data-row="1" data-col="4" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="4" data-sizex="2" data-sizey="1"></li><li data-row="3" data-col="4" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="5" data-sizex="1" data-sizey="1"></li><li data-row="3" data-col="5" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="6" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="6" data-sizex="1" data-sizey="2"></li>');
					$(".gridster ul").gridster({
				        widget_margins: [10, 10],
				        widget_base_dimensions: [140, 140]
				    });
				    var gridster = $(".gridster ul").gridster().data('gridster');
 					var b = gridster.serialize();
 					console.log(b);
				} 
	        },
			template: '<div class="toolbar"><button class="btn btn-info" ng-click="createRow()">Add Row</button><label>Column Amount</label><select><option ng-repeat="item in getNumber(maxcol) track by $index" value="{{$index+1}}">{{$index+1}}</option></select></div><div class="gridster"><ul></ul></div>'
		}	
  });

