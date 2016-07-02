angular.module('HousingComparisonTool')
  .factory('housingFactory',
    [
      '$http',
      function housingFactory($http) {
        const host = 'http://localhost:8081';
        const path = '/housing';

        function get() {
          return $http.get(host + path).then((data) => {
            return data;
          });
        }

        function post(house) {
          return $http.post(host + path, house).then(() => {
            return console.log('posted successfully');
          },
          () => {
            return console.log('post failed');
          });
        }

        return {
          get: get,
          post: post
        }
      }
    ]
  )