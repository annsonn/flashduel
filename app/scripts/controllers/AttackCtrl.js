'use strict';

angular.module('app').controller('AttackCtrl', function($scope, $log, PlayerService, PlayerUtilService) {
    $scope.attack = function(player) {
        var attack = PlayerUtilService.attackNumbersMatch(player);
        if (attack === 0) {
            $log.error('Attack numbers do not match!');
            return false;
        }

        PlayerService.attack(player, attack);
    };
});
