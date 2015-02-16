'use strict';

angular.module('appApp')
	.controller('EditAvatarController', function ($scope, Auth) {
	  $scope.user = {
	    avatar: Auth.getCurrentUser().avatar
	  };
	})

	//show the avatar
    .directive('editAvatar', function() {
  		return {
  			controller: 'EditAvatarController',
  			restrict: 'C',
  			trasclude: true,
  			template: '<img src="{{user.avatar}}" data-toggle="modal" data-target="#edit-avatar-modal">'
		};
	})

	.directive('editAvatarModal', function(){
		return {
			controller: 'EditAvatarController',
			restrict: 'C',
			trasclude: true,
			template: '<div class="modal fade" id="edit-avatar-modal" role="dialog" aria-hidden="true"><img src="{{user.avatar}}"><button class="close btn btn-primary" data-dismiss="modal">x</button></div>'
		}
	});