'use strict';

angular.module('app').controller('MoveCtrl', function($scope, $log, PlayerService) {
    $scope.move = function(player, direction){
        if (player.move === null || !direction) {
            $log.error('Move or Direction is not selected.');
            return false;
        }
        PlayerService.move(player, direction);
    }
});
