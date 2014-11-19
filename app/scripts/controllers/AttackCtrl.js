'use strict';

angular.module('app').controller('AttackCtrl', function($scope, $log, PlayerService, PlayerUtilService) {
    $scope.attack = [];
    $scope.attackPlayer = function() {

        var attack = PlayerUtilService.attackNumbersMatch($scope.player, $scope.attack);


        //TODO: this isn't triggered
        if (attack === 0 && PlayerUtilService.canAttack($scope.player, $scope.attack)) {
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
