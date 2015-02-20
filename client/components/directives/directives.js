'use strict';

angular.module('appApp')
	.controller('EditAvatarController', function ($scope, Auth) {
	  var user = Auth.getCurrentUser();
	  $scope.user = {
	    avatar: user.avatar,
	    newAvatar: ''
	  };
	})

	//show the avatar
    .directive('editAvatar', function() {
  		return {
  			controller: 'EditAvatarController',
  			restrict: 'C',
  			template: '<img ng-src="{{user.avatar}}" ng-cloak><button class="btn btn-primary" data-toggle="modal" data-target="#edit-avatar-modal">Edit Avatar</button>'
		};
	})

	.directive('editAvatarModal', function(){
		return {
			restrict: 'C',
			controller: 'EditAvatarController',
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                scope.$apply(function () {
	                    scope.user.newAvatar = "uploads/" + changeEvent.target.files[0].name;
	                    // or all selected files:
	                    // scope.fileread = changeEvent.target.files;
	                });
	            });
	        },
			//templateUrl: 'edit-avatar.html'
			template: '<div class="modal fade" id="edit-avatar-modal" role="dialog" aria-hidden="true"><img ng-src="{{user.avatar}}"><form id="uploadForm" ng-submit="changeAvatar(form)" enctype="multipart/form-data" action="/api/photo" method="post" name="form" no-validate><input type="file" ng-model="user.newAvatar" name="newAvatar"><button type="submit" value="Upload Image" name="submit" class="btn btn-lg btn-primary">Save changes</button></form><button class="close btn btn-primary" data-dismiss="modal">x</button></div>'
		}
	});