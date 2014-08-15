'use strict';

angular
    .module('app')
    .service('GameService', ['$log', function($log) {
      var service = {};

      var startingPlayer  = Math.floor(Math.random()*2);

      service.currentPlayer = startingPlayer;

      service.changePlayer = function changePlayer(){
        service.currentPlayer = (service.currentPlayer === 0) ? 1 : 0;
      };

      return service;
    }]);