(function () {
    var mainApp = angular.module('mainApp');
    mainApp.filter('startForm', function () {
        return function (input, start) {
            if (input !== undefined) {
                start = +start;
                return input.slice(start);
            }
        }
    });
    mainApp.filter('diskFilt', function () {
        return function (inpa, inpb, dataArray) {
            //console.log(inp);
            //console.log(dataArray);
            var filtArray = [];
            for (i = 0; i < dataArray.length; i++) {
                if (inpa !== dataArray[i].name && inpb !== dataArray[i].name) {
                    filtArray.push(dataArray[i]);
                }
            }
            //console.log(filtArray);
            return filtArray;
        }
    });
})();