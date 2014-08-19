'use strict';

angular.module('app')
  .service('GameService', function($log) {
    var service = {};

    var startingPlayer  = Math.floor(Math.random()*2);

    service.currentPlayer = startingPlayer;

    service.gameEnded = false;

    service.changePlayer = function changePlayer(){
        service.currentPlayer = (service.currentPlayer === 0) ? 1 : 0;
    };

    service.gameOver = function gameOver() {
      $log.log('game over!');
      service.gameEnded = true;
    };

    return service;
});