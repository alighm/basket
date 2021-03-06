angular.module('basket', ['ngGrid', 'ui.bootstrap']).controller('BasketCtrl', function ($scope) {
    $scope.items = [];
    $scope.total = 0;
    $scope.salesTax = 0;
    $scope.loading = false;

    $scope.gridOptions = {
        data: 'items',
        columnDefs: [
            {field: 'description', displayName: 'Item'},
            {field: 'quantity', displayName: 'Quantity'},
            {field: 'price', displayName: 'Item Price', cellFilter: 'currency'}]
    };

    $scope.addItem = function() {
        if (isNaN($scope.itemPrice)) {
            $scope.itemPrice = 0;
        }
        var totalPrice = $scope.itemPrice * $scope.itemQuantity,
            tax = $scope.itemPrice * 5 / 100;

        $scope.salesTax = parseFloat($scope.salesTax) + parseFloat(tax);
        $scope.salesTax = (Math.ceil($scope.salesTax * 20) / 20).toFixed(2);

        $scope.items.push({
            description: $scope.itemDesc,
            quantity: $scope.itemQuantity,
            price: $scope.itemPrice,
            totalPrice: totalPrice});

        $scope.total += totalPrice;

        $scope.itemDesc = "";
        $scope.itemQuantity = "";
        $scope.itemPrice = "";
    };

    $scope.getTotalItems = function() {
        return $scope.items.length;
    };

    $scope.clearItems = function() {
        $scope.items = [];
        $scope.total = 0;
        $scope.salesTax = 0;
    };

    $scope.calculate = function () {
        $scope.calModal = true;
    };

    $scope.closeCalculate = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.calModal = false;
    };

});