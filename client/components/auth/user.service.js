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
      //gravitar later... service/controller/model/front end/seed a default/directive
      changeAvatar: {
        method: 'PUT',
        params: {
          controller:'avatar'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
