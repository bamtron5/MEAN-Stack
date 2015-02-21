angular.module('appApp')
	.controller('GridsterCtrl', function ($scope, Auth) {
	  $scope.maxcol = 15;
	  $scope.row = 0; 
	  $scope.getNumber = function(num){
	  	return new Array(num);
	  }

	  
	})

	
	.directive('editGrid', function(){
		return {
			restrict: 'C',
			controller: 'GridsterCtrl',
	        link: function (scope, element, attributes) {
	            scope.createRow = function(){
					console.log(element);
					element.find('ul').append('<li data-row="1" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="3" data-col="1" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="2" data-sizex="2" data-sizey="1"></li><li data-row="2" data-col="2" data-sizex="2" data-sizey="2"></li><li data-row="1" data-col="4" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="4" data-sizex="2" data-sizey="1"></li><li data-row="3" data-col="4" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="5" data-sizex="1" data-sizey="1"></li><li data-row="3" data-col="5" data-sizex="1" data-sizey="1"></li><li data-row="1" data-col="6" data-sizex="1" data-sizey="1"></li><li data-row="2" data-col="6" data-sizex="1" data-sizey="2"></li>');
				} 
	        },
			//templateUrl: 'edit-avatar.html'
			template: '<div class="toolbar"><button class="btn btn-info" ng-click="createRow()">Add Row</button><label>Column Amount</label><select><option ng-repeat="item in getNumber(maxcol) track by $index" value="{{$index+1}}">{{$index+1}}</option></select></div><div class="gridster"><ul></ul></div>'
		}
	});