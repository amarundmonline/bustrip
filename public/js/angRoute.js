(function () {
    var mainApp = angular.module('mainApp');
    mainApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $locationProvider.hashPrefix('');
        $stateProvider.state('home', {
            url: '/'
            , templateUrl: '/files/home.html'
            , controller: 'rtSrchCntrl as rtSrCn'
        });
        $stateProvider.state('search', {
            url: '/search?formCityName&toCityName&onward&return'
            , templateUrl: '/files/search.html'
            , controller: 'rtSrchRsltCntrl as rtSrRsCn'
        })
        $stateProvider.state('success', {
            url: '/bookingsuccess'
            , views: {
                'success': {
                    templateUrl: '/files/bookingsuccess.html'
                    , controller: 'rtSuccessCntrl as rtSuCn'
                }
            }
        });
        $stateProvider.state('bookingsuccess', {
            url: '/success'
            , templateUrl: '/files/success.html'
            , controller: 'thankyou as ty'
        })
        $urlRouterProvider.otherwise('/');
    }]);
})();