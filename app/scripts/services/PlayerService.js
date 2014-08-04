'use strict';

angular
    .module('app')
    .service('PlayerService', ['$log', function($log) {
      var service = {};

      service.movePlayer = function movePlayer(player, spaces) {
        player.position = player.position + (player.direction * spaces);

      };

      return service;
    }]);