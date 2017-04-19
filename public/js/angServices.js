(function () {
    var mainApp = angular.module('mainApp');
    mainApp.service('dataService', ['$log', '$http', function ($log, $http) {
        this.dataAll = {
            cities: cities
            , searchResult: searchResult
            , submitBooking: submitBooking
        }

        function cities() {
            return $http({
                url: '/api/allcities'
                , method: 'get'
            });
        };

        function searchResult(stateParams) {
            return $http({
                url: '/api/searchresult'
                , method: 'get'
                , params: stateParams
            })
        }

        function submitBooking(values, bid) {
            return $http({
                url: '/api/submitbooking'
                , method: 'post'
                , params: {
                    seats: values
                    , busId: bid
                }
            })
        }
    }]);
    mainApp.factory("fareCalculator", ['$log', '$http', function ($log, $http) {
        var fareCalculator = {
            baseFare: baseFare
            , numberOfSeat: numberOfSeat
            , taxSlab: taxSlab
            , currentTaxCalculated: 0
            , internetHandlingFee: internetHandlingFee
            , totalFareCalculator: totalFareCalculator
        }

        function baseFare(baseFare) {
            return baseFare;
        };

        function numberOfSeat(numberOfSeat) {
            return numberOfSeat;
        };

        function taxSlab(taxSlab, numberOfSeat) {
            fareCalculator.currentTaxCalculated = ((taxSlab * 1) / 100) * numberOfSeat;
            return ((taxSlab * 1) / 100) * numberOfSeat;
        };

        function internetHandlingFee(internetHandlingFee) {
            return 50;
        };

        function totalFareCalculator(baseFare, numberOfSeat, taxSlab, internetHandlingFee) {
            return (baseFare * numberOfSeat) + taxSlab + internetHandlingFee;
        }
        return fareCalculator;
    }]);
})();