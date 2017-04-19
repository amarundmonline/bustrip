(function () {
    var mainApp = angular.module('mainApp');
    mainApp.directive('custCheckBox', ['$log', function ($log) {
        return {
            template: '<input type="checkbox" value="" ng-model="rtSrRsCnAdapt" ng-true-value="{{trval}}" ng-false-value="{{fval}}" ng-change="dial({message:rtSrRsCnAdapt})">'
            , controller: function ($scope, $element, $attrs) {
                //console.log($scope.rtSrRsCnAdapt);
            }
            , scope: {
                trval: '@'
                , fval: '@'
                , rtSrRsCnAdapt: '=newObj'
                , dial: '&'
            }
        }
    }]);
})();