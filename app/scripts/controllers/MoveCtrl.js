'use strict';

angular.module('app').controller('MoveCtrl', function($scope, $log, PlayerService) {
    $scope.move = function(player, direction){
        PlayerService.move(player, direction);
    }
});
