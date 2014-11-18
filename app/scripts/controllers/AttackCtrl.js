'use strict';

angular.module('app').controller('AttackCtrl', function($scope, $log, PlayerService) {
    $scope.attack = function(player) {
        PlayerService.attack(player);
    };
});
