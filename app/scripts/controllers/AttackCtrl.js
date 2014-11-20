'use strict';

angular.module('app').controller('AttackCtrl', function($scope, $log, PlayerService, PlayerUtilService) {
    $scope.attack = [];
    $scope.attackPlayer = function() {

        if ($scope.attack.length === 0) {
            $log.error('No Attack cards selected!');
            return false;
        }

        var attack = PlayerUtilService.attackNumbersMatch($scope.player, $scope.attack);

        if (attack === 0) {
            $log.error('Attack numbers do not match!');
            return false;
        }

        var action = PlayerUtilService.canAttack($scope.player, attack);

        action.attack = attack;

        if (action.opponentPlayerIndex == '') {
            $log.error('Cannot attack opponent with ', action.attack.number);
            return false;
        }

        PlayerService.attack($scope.player, action);
    };
});
