angular.module('HousingComparisonTool')
  .controller('HouseFormCtrl',
    [
      '$scope',
      'housingFactory',
      '$state',
      '$uibModalInstance',
      function($scope,
               housingFactory,
               $state,
               $modalInstance) {

        const capitalEx = 182.75;

        $scope.formFields = [
          'Neighborhood',
          'Address',
          'Zip Code',
          'List Price',
          'Redfin Estimate',
          'Zillow Estimate',
          'Square Feet',
          'Beds',
          'Bath',
          'Home Type',
          'HOA Fees',
          'Property Tax',
          'Rent Zestimate',
          'Extra information'
        ];

        $scope.house = {};

        $scope.back = function() {
          $modalInstance.close();
        };

        $scope.postForm = function() {
          makeCalculations();
          housingFactory.post($scope.house).then(function() {
            $modalInstance.close();
          });
        };

        function makeCalculations() {
          $scope.house['Mortgage Payment'] = calculateMortgagePayment($scope.house['List Price'], 4.5, 360);
          $scope.house['Down Payment'] = .2 * $scope.house['List Price'];
          $scope.house['Property Tax per month'] = $scope.house['Property Tax'] / 12;
          $scope.house['Expenses'] = $scope.house['Mortgage Payment'] + $scope.house['Property Tax per month'] + capitalEx;
          $scope.house['Income'] = $scope.house['Rent Zestimate'] - $scope.house['Expenses'];
        }

        //assuming interest rate is in % 3.5% == .0035
        function calculateMortgagePayment(houseCost, interestPercent, numberOfMonths) {
          let mortgageCost = houseCost * .8;
          console.log(`mortgageCost: ${mortgageCost}`);
          let interestRate = interestPercent / 100 / 12;
          console.log(`interestRate: ${interestRate}`);
          console.log(`numberOfMonths: ${numberOfMonths}`);
          let numerator = mortgageCost * interestRate * Math.pow((1 + interestRate), numberOfMonths);
          let denominator = Math.pow((1 + interestRate), numberOfMonths) - 1;
          console.log(`numerator: ${numerator}`);
          console.log(`denom: ${denominator}`);
          let mortgagePayment = numerator / denominator;
          console.log(`mortgagePayment per month: ${mortgagePayment}`);
          return mortgagePayment;
        }
      }
    ]);