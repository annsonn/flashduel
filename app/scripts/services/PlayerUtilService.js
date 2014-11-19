'use strict';

angular.module('app')
    .service('PlayerUtilService', function($log, DeckService, BoardService) {
      var service = {};

      service.dealPlayerHand = function DealPlayerHand(player) {
        var missingCards = 5 - player.hand.length;

        for (var i = 0; i < missingCards; i++) {
          player.hand = player.hand.concat(DeckService.deal(1));
        }
        return player.hand;

      };

      service.attackNumbersMatch = function attackNumbersMatch(player, attack) {
        var result = {
          number: 0,
          quantity: 0
        };

        for (var i = 0; i < attack.length; i++) {
          if (result.number === 0 && attack[i] == true) {
            result.number = player.hand[i];
          }
          if (attack[i] == true && result.number == player.hand[i]) {
            result.quantity = result.quantity + 1;
          }
          if (result.number != 0 && attack[i] == true && player.hand[i] != result.number) {
            return 0;
          }
        }
        return result;
      };

      service.canAttack = function canAttack(player, attack){
          var action = { attack: attack };

          action.targetLocation =  player.position + player.direction*action.attack.number;
          action.opponentPlayerIndex = BoardService.getPlayerByLocation(action.targetLocation);

          return action;
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
