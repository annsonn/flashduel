/**
 * Created by ansonchung on 14-11-18.
 */
'use strict';

angular.module('app').controller('DashingCtrl', function($scope, $log, PlayerService) {
    $scope.dashingStrike = function(player) {


        PlayerService.dashingStrike(player);
    };
});
