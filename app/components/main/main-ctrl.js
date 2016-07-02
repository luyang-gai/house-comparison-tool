angular.module('HousingComparisonTool')
  .controller('MainCtrl',
  [
    '$scope',
    '$state',
    'housingFactory',
    '$uibModal',
    function($scope,
             $state,
             housingFactory,
             $modal)
    {

      const dbToDisplayNames = {
        'Redfin Estimate': 'RFE',
        'Zillow Estimate': 'ZE',
        'Square Feet': 'SQFEET',
        'HOA Fees': 'HOA',
        'Home Type': 'Type',
        'Rent Zestimate': 'Zestimate',
        'Extra information': 'Info',
        'Mortgage Payment': 'Mortgage',
        'List Price': 'Price',
        'Zip Code': 'Zip',
        'Property Tax per month': 'Property Tax'
      };

      const hiddenFields = ['_id', 'Property Tax'];

      $scope.openHouseFormModal = function(player) {
        var modalInstance = $modal.open({
          templateUrl: 'app/components/house-form/house-form-ctrl.html',
          controller: 'HouseFormCtrl',
          backdrop: true,
          keyboard: false,
          size: 'lg',
          resolve: {
            player: function () {
              return player;
            }
          }
        });

        modalInstance.result.then(function(item) {
          console.log('modal success');
          init();
        }, function() {
          console.log('modal failure?');
        });
      };

      $scope.goToHousingForm = function() {
        $state.go('housingForm');
      };

      $scope.order = function(orderProp) {
        $scope.reverse = ($scope.orderProp === orderProp) ? !$scope.reverse : false;
        $scope.orderProp = orderProp;
      };

      function init() {
        housingFactory.get().then(setupTable);
      }

      function setupTable(data) {
        $scope.housingData = data.data;
        $scope.tableColumns = [];
        for (let field in $scope.housingData[$scope.housingData.length - 1]) {
          if (hiddenFields.indexOf(field) === -1) {
            $scope.tableColumns.push(field);
          }
        }
      }

      $scope.predicate = function(rows) {
        return rows[$scope.orderProp];
      };

      $scope.displayColumnTitle = function(column) {
        if (dbToDisplayNames[column]) {
          return dbToDisplayNames[column];
        } else {
          return column;
        }
      };

      $scope.displayValue = function(house, column) {
        if ($scope.tableColumns.indexOf(column) === -1) {
          console.log(`tried to push column: ${column}`);
          $scope.tableColumns.push(column);

        }
        if (typeof house[column] === 'number') {
          return house[column].toFixed(2);
        }
        return house[column];
      }
      
      init();
    }
  ]);