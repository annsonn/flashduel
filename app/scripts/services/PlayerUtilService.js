'use strict';

angular.module('app')
    .service('PlayerUtilService', function($log, DeckService) {
      var service = {};

      service.dealPlayerHand = function DealPlayerHand(player) {
        var missingCards = 5 - player.hand.length;

        for (var i = 0; i < missingCards; i++) {
          player.hand = player.hand.concat(DeckService.deal(1));
        }
        return player.hand;

      };

      service.attackNumbersMatch = function attackNumbersMatch(player) {
        var attack = {
          number: 0,
          quantity: 0
        };
        for (var i = 0; i < player.attack.length; i++) {
          if (attack.number === 0 && player.attack[i] == true) {
            attack.number = player.hand[i];
          }
          if (player.attack[i] == true && attack.number == player.hand[i]) {
            attack.quantity = attack.quantity + 1;
          }
          if (attack.number != 0 && player.attack[i] == true && player.hand[i] != attack.number) {
            return 0;
          }
        }
        return attack;
      };

      service.attackOpponent = function attackOpponent(player, opponentPlayer, action) {
        for (var i = 0; i < action.attack.quantity; i++) {
          var opponentCanBlock = opponentPlayer.hand.indexOf(action.attack.number);
          if (opponentCanBlock == -1) {
            return {successful: 'opponent cannot block'};
          }
          opponentPlayer.hand.splice(opponentCanBlock, 1);
          $log.log('opponent blocked 1 of '+ action.attack.quantity + ' attack', opponentPlayer.hand);
          player.hand.splice(player.hand.indexOf(action.attack.number), 1);
        }
        $log.log('opponent blocked attack', opponentPlayer.hand);
        return {failed: 'opponent blocked attack'};
      };

      return service;
    });