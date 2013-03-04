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

    taxCalculate = function() {
        // Taxes for these goods are 0. Everything else 10%
        var taxGoods = ['food', 'book', 'medical', 'chocolate', 'bar', 'fruit',
            'pizza', 'tomato', 'can', 'soup','vegetable'],

            // Additional 5% tax for any of these products.
            taxImport = ['import', 'Imported', 'Import'],
            tax;

        if (!taxGoods.some(function(v) {
            return $scope.itemDesc.indexOf(v) >= 0;
        }) && taxImport.some(function(v) {
            return $scope.itemDesc.indexOf(v) >= 0;
        })) {
            tax = ($scope.itemPrice * 15) / 100;
        } else if (taxImport.some(function(v) {
            return $scope.itemDesc.indexOf(v) >= 0;
        })) {
            tax = ($scope.itemPrice * 5) / 100;
        } else if (!taxGoods.some(function(v) {
            return $scope.itemDesc.indexOf(v) >= 0;
        })) {
            tax = ($scope.itemPrice * 10) / 100;
        }

        return tax;
    };

    $scope.addItem = function() {
        if (isNaN($scope.itemPrice)) {
            $scope.itemPrice = 0;
        }
        var totalPrice = $scope.itemPrice * $scope.itemQuantity,
            tax = taxCalculate() !== undefined ? taxCalculate() : 0;

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