(function () {
    var mainApp = angular.module('mainApp');
    mainApp.controller('chCntrl', ['$scope', function ($scope) {}]);
    //final success page controller
    mainApp.controller('thankyou', ['$scope', function ($scope) {
        var vm = this;
        vm.successMessage = 'You are successfully completed booking';
        vm.successCopy = 'Details below';
    }]);
    //final success page controller
    //page 1 search controller
    mainApp.controller('rtSuccessCntrl', ['$scope', function ($scope) {}]);
    mainApp.controller('rtSrchCntrl', ['$scope', '$timeout', '$location', '$window', '$state', 'dataService', 'diskFiltFilter', function ($scope, $timeout, $location, $window, $state, dataService, diskFiltFilter) {
        var vm = this;
        vm.FromSrc = undefined;
        vm.toDst = undefined;
        vm.lastfrom = localStorage.from;
        vm.lastto = localStorage.to;
        vm.FromSrc = localStorage.from;
        vm.toDst = localStorage.to;
        //vm.srcInpSrc = localStorage.from;
        vm.uiloaded = true;
        $scope.pageClass = 'fadecool';
        $timeout(function () {
            vm.exp = true;
        }, 0);
        //console.log(window.localStorage.key(1));
        vm.selectedPlace = null;
        $scope.today = new Date();
        dataService.dataAll.cities().then(function (data) {
            vm.nonFiltData = data.data;
            // vm.placeArray = data.data;
            vm.states = data.data;
            //console.log(data.data);
        });
        //filter data according to use selection
        function inpChFilt() {
            //console.log('DataChanged');
        }
        vm.triigerCheck = triigerCheck;

        function triigerCheck() {
            console.log('triggered');
        }
        //console.log(vm.placeArray);
        //Search Form Data Array
        vm.dataArray = {};
        //Submit click control
        vm.rtSrch = rtSrch;
        vm.filtDataA = filtDataA;
        vm.filtDataB = filtDataB;

        function filtDataA(datac, datad) {
            //console.log(data);
            vm.states = diskFiltFilter(datac, datad, vm.nonFiltData);
            console.log('Triigred a');
        };

        function filtDataB(datac, datad) {
            //console.log(data);
            vm.states = diskFiltFilter(datac, datad, vm.nonFiltData);
            console.log('Triigred b');
        };

        function rtSrch(vldtyStats) {
            if (vldtyStats) {
                vm.onErMsg = true;
                $state.go('search', {
                    'formCityName': (vm.FromSrc).toUpperCase()
                    , 'toCityName': (vm.toDst).toUpperCase()
                    , 'onward': vm.dataArray.onwardCal.split('-').reverse().join('-')
                    , 'return': (vm.dataArray.returnCal !== undefined) ? vm.dataArray.returnCal.split('-').reverse().join('-') : 'NoReturn'
                });
                localStorage.from = (vm.FromSrc).toUpperCase();
                localStorage.to = (vm.toDst).toUpperCase();
            }
            else {
                vm.onErMsg = true;
                // alert('Please fill all fileds');
            }
        };
        vm.endDateBeforeRender = endDateBeforeRender
        vm.endDateOnSetTime = endDateOnSetTime
        vm.startDateBeforeRender = startDateBeforeRender
        vm.startDateOnSetTime = startDateOnSetTime

        function startDateOnSetTime() {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime() {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender($dates) {
            var minDate = new Date().setHours(0, 0, 0, 0)
            $dates.filter(function (date) {
                return date.localDateValue() < minDate
            }).forEach(function (date) {
                date.selectable = false;
            })
            if (vm.dataArray.returnCal) {
                var activeDate = moment(vm.dataArray.returnCal);
                $dates.filter(function (date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        function endDateBeforeRender($view, $dates) {
            var minDate = new Date().setHours(0, 0, 0, 0)
            $dates.filter(function (date) {
                return date.localDateValue() < minDate
            }).forEach(function (date) {
                date.selectable = false;
            })
            if (vm.dataArray.onwardCal) {
                var activeDate = moment(vm.dataArray.onwardCal).subtract(1, $view).add(1, 'minute');
                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }
        //bus search filter details
        //inter change function
        vm.interChange = interChange;
        vm.rotate = true;
        vm.clickAct = false;

        function interChange() {
            vm.clickAct = true;
            if (vm.FromSrc !== undefined && vm.toDst !== undefined) {
                var a = vm.FromSrc;
                var b = vm.toDst;
                vm.FromSrc = b;
                vm.toDst = a;
                vm.rotate = !vm.rotate ? true : false;
            }
        }
    }]);
    //page 1 search controller
    //search result page controller
    mainApp.controller('rtSrchRsltCntrl', ['$scope', '$filter', 'dataService', '$stateParams', '$state', 'fareCalculator', function ($scope, $filter, dataService, $stateParams, $state, fareCalculator) {
        var vm = this;
        vm.showAminity = showAminity;
        //$scope.amnity = false;
        function showAminity(index) {
            // alert('cool');
            //$scope.amnity = $scope.amnity === false ? true : false;
            vm.activeSeatsNowArray = [];
            vm.SearchResult.forEach(function (item, index) {
                item.seats.leftRow.forEach(function (item1, index1) {
                    item1.forEach(function (item2, index2) {
                        //console.log(item2);
                        item2.seatEngage = false;
                    });
                });
                item.seats.rightRow.forEach(function (item1, index1) {
                    item1.seatEngage = false;
                });
            });
            vm.aminity = vm.aminity === index ? null : index;
            vm.seatsActive = null;
            //alert($scope.amnity);
            vm.localError = false;
            vm.localSelectedBus = null;
        }
        vm.viewBusSeats = viewBusSeats;
        vm.formCityActive = $stateParams.formCityName;
        vm.toCityActive = $stateParams.toCityName;

        function viewBusSeats(index) {
            vm.activeSeatsNowArray = [];
            vm.SearchResult.forEach(function (item, index) {
                item.seats.leftRow.forEach(function (item1, index1) {
                    item1.forEach(function (item2, index2) {
                        //console.log(item2);
                        item2.seatEngage = false;
                    });
                });
                item.seats.rightRow.forEach(function (item1, index1) {
                    item1.seatEngage = false;
                });
            });
            vm.seatsActive = vm.seatsActive === index ? null : index;
            vm.aminity = null;
            vm.localError = false;
            vm.localSelectedBus = null;
        }
        vm.bsDataLoad = false;
        vm.bsNoData = false;
        vm.currentPage = 0;
        vm.pageSize = 5;
        //pagination    
        vm.nextPage = nextPage;
        vm.previousPage = previousPage;
        vm.currentPageActive = currentPageActive;
        //function for next page
        vm.pagination = [];
        vm.checkPages = checkPages;
        vm.theObj = {
            "value": "busName"
        };
        /*$scope.$watch(function () {
            return vm.theObj;
        }, function (pval, cval) {
            if (pval !== cval) {
                
                console.log('value changed');
                vm.filtOpt = vm.theObj.value;
                
                
            }
        }, true); */
        $scope.cool = function (message) {
            console.log(message);
            vm.filtOpt = message;
        }

        function currentPageActive(page) {
            vm.currentPage = page;
            vm.seatsActive = null;
            vm.aminity = null;
        }

        function nextPage() {
            //console.log(vm.currentPage * vm.pageSize);
            //console.log(vm.SearchResult.length);
            //if (((vm.currentPage * vm.pageSize) + vm.pageSize) < vm.SearchResult.length) {
            if (vm.currentPage + 1 < Math.round(vm.SearchResult.length / vm.pageSize)) {
                //console.log('triggred');
                vm.currentPage = vm.currentPage + 1;
                vm.seatsActive = null;
                vm.aminity = null;
            }
            //console.log(vm.currentPage);
            //console.log(vm.SearchResult.length);
        };

        function previousPage() {
            if (vm.currentPage > 0) {
                vm.currentPage = vm.currentPage - 1;
                vm.seatsActive = null;
                vm.aminity = null;
            }
        }

        function calculatePages() {
            console.log(vm.pagination);
            vm.pagination = [];
            //console.log(Math.round(vm.SearchResult.length / vm.pageSize));
            for (i = 0; i < Math.round(vm.SearchResult.length / vm.pageSize); i++) {
                vm.pagination.push(i);
                vm.currentPage = 0;
            }
            console.log(vm.pagination);
            // alert('changeing');
        }

        function checkPages() {
            //console.log(Boolean(vm.pageSize !== "" ));
            //alert('Hello');
            if (vm.pageSize !== "") {
                if (parseInt(vm.pageSize) !== 0) {
                    calculatePages();
                }
            }
        }
        dataService.dataAll.searchResult($stateParams).then(function (data) {
            console.log('Get Parameter', $stateParams);
            console.log(data.data.data);
            if (data.data.flag === true) {
                var numbers = data.data.data;
                numbers.forEach(function (item, index) {
                    item.ticketPrice = parseFloat(item.ticketPrice);
                    item.amenities = item.amenities.split(',');
                });
                numbers.forEach(function (item, index) {
                    var makingPacketRight = [];
                    var slicedArray = [];
                    item.seats.leftRow.forEach(function (value, index) {
                        slicedArray.push(value);
                        if (index % 2) {
                            makingPacketRight.push(slicedArray);
                            slicedArray = [];
                        }
                        else {
                            if (index === (vm.seatsLeftRow.length - 1)) {
                                console.log('last array');
                                makingPacketRight.push(slicedArray);
                                slicedArray = [];
                            }
                        }
                    });
                    //  console.log(makingPacketRight);
                    item.seats.leftRow = makingPacketRight;
                });
                vm.SearchResult = numbers;
                vm.bsDataLoad = true;
                vm.bsNoData = false;
                calculatePages();
            }
            else {
                vm.bsDataLoad = true;
                vm.bsNoData = true;
            }
        });
        vm.filtOpt = 'busName';
        //toogle-filter data
        vm.tglSort = tglSort;
        vm.tglValue = false;

        function tglSort() {
            vm.tglValue = vm.tglValue === false ? true : false;
        }
        //bus seat controller
        vm.seatsRightRow = ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
        vm.seatsLeftRow = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
        vm.doubleRowSeats = function () {
            var makingPacketRight = [];
            var slicedArray = [];
            vm.seatsLeftRow.forEach(function (value, index) {
                slicedArray.push(value);
                if (index % 2) {
                    makingPacketRight.push(slicedArray);
                    slicedArray = [];
                }
                else {
                    if (index === (vm.seatsLeftRow.length - 1)) {
                        console.log('last array');
                        makingPacketRight.push(slicedArray);
                        slicedArray = [];
                    }
                }
            });
            return makingPacketRight;
        }
        vm.singleRowSeat = function () {
                return vm.seatsRightRow;
            }
            //console.log(makingPacketRight);
        vm.seatsRight = vm.singleRowSeat();
        vm.seatsLeft = vm.doubleRowSeats();
        //bus seat controller
        //seat booking controller
        vm.activeSeatsNow = activeSeatsNow;
        vm.activeSeatsNowArray = [];
        vm.seatCheck = function (busId, SeatId, statAct) {
            vm.SearchResult.forEach(function (item, index) {
                if (item.busId === busId) {
                    item.seats.leftRow.forEach(function (item1, index1) {
                        item1.forEach(function (item2, index2) {
                            if (item2.sId === SeatId) {
                                //console.log(item2);
                                item2.seatEngage = !statAct ? true : false;
                            }
                        });
                    });
                    item.seats.rightRow.forEach(function (item1, index1) {
                        if (item1.sId === SeatId) {
                            item1.seatEngage = !statAct ? true : false;
                        }
                    });
                }
            });
        };
        vm.localError = false;
        vm.localSelectedBus = null;

        function activeSeatsNow(busId, SeatId, Price, statAct) {
            vm.finalBooking = null;
            console.log(statAct);
            if (!statAct) {
                //if active
                if (vm.activeSeatsNowArray.length !== 0) {
                    console.log('1');
                    if (vm.activeSeatsNowArray.length < 4) {
                        var found = false;
                        vm.activeSeatsNowArray.forEach(function (val, ind) {
                            if (busId === val.budId && SeatId === val.SeatId) {
                                found = true;
                            }
                        });
                        if (!found) {
                            if (SeatId <= 20) {
                                vm.activeSeatsNowArray.push({
                                    "budId": busId
                                    , "SeatId": SeatId
                                    , "StSide": "left"
                                    , "Price": Price
                                });
                            }
                            else {
                                vm.activeSeatsNowArray.push({
                                    "budId": busId
                                    , "SeatId": SeatId
                                    , "StSide": "right"
                                    , "Price": Price
                                });
                            }
                        }
                        vm.seatCheck(busId, SeatId, statAct);
                        vm.localError = false;
                    }
                    else {
                        //var cfound = false;
                        if (vm.activeSeatsNowArray[0].budId === busId) {
                            vm.localError = true;
                            vm.localSelectedBus = busId;
                        }
                    }
                }
                else {
                    console.log('0');
                    vm.activeSeatsNowArray.push({
                        "budId": busId
                        , "SeatId": SeatId
                        , "StSide": "left"
                        , "Price": Price
                    });
                    vm.seatCheck(busId, SeatId, statAct);
                    vm.localError = false;
                }
                // console.log(vm.SearchResult);
            }
            else {
                if (vm.activeSeatsNowArray.length !== 0) {
                    vm.activeSeatsNowArray.forEach(function (val, ind) {
                        if (busId === val.budId && SeatId === val.SeatId) {
                            console.log('Found One');
                            vm.activeSeatsNowArray.splice(ind, 1);
                            vm.localError = false;
                        }
                    })
                }
                vm.SearchResult.forEach(function (item, index) {
                    if (item.busId === busId) {
                        item.seats.leftRow.forEach(function (item1, index1) {
                            item1.forEach(function (item2, index2) {
                                if (item2.sId === SeatId) {
                                    //console.log(item2);
                                    item2.seatEngage = !statAct ? true : false;
                                }
                            });
                        });
                        item.seats.rightRow.forEach(function (item1, index1) {
                            if (item1.sId === SeatId) {
                                item1.seatEngage = !statAct ? true : false;
                            }
                        });
                    }
                });
            }
            //if not active
            function compare(a, b) {
                // alert('compare');
                if (a.SeatId < b.SeatId) return -1;
                if (a.SeatId > b.SeatId) return 1;
                return 0;
            }
            vm.activeSeatsNowArray = vm.activeSeatsNowArray.sort(compare);
        };
        //booking controller
        vm.fareCalculator = fareCalculator;
        //final booking control
        vm.finalBooking = null;
        vm.globalNotValid = false;
        vm.contactServer = function (valid) {
            console.log(vm.finalBooking);
            if (valid) {
                for (ind in vm.finalBooking) {
                    console.log(vm.finalBooking[ind]);
                    if (ind <= 20) {
                        vm.finalBooking[ind].seatSide = 'left';
                    }
                    else {
                        vm.finalBooking[ind].seatSide = 'right';
                    }
                }
                dataService.dataAll.submitBooking(vm.finalBooking, vm.activeSeatsNowArray[0].budId).then(function (result) {
                    console.log(result.data);
                    $('#myModal').modal('hide');
                    // $('#mySuBModal').modal('show');
                    $state.go('bookingsuccess', {});
                   // $state.go('search', {});
                });
            }
            else {
                vm.globalNotValid = true;
                return false;
            }
        }
        vm.resetPayment = resetPayment;

        function resetPayment() {
            vm.globalNotValid = false;
        }
    }]);
    //search result page controller
})();