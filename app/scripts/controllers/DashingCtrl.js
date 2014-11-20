/**
 * Created by ansonchung on 14-11-18.
 */
'use strict';

angular.module('app').controller('DashingCtrl', function($scope, $log, PlayerService) {
    $scope.dashingStrike = {attack: []};
    $scope.dashingStrikeAction = function() {
        $log.log('Player', $scope.player);
        $log.log('Dashing Strike', $scope.dashingStrike);

        //PlayerService.dashingStrike($scope.player, $scope.dashingStrike);
    };
});
