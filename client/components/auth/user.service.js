'use strict';

angular.module('appApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      //service/controller/model/front end/seed a default/directive/aws service.
      //upload to aws, save sting with api/form
      changeAvatar: {
        method: 'PUT',
        params: {
          controller:'avatar',
          id: '@newAvatar'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  })
  });
