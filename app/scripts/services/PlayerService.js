'use strict';

angular.module('app')
    .service('PlayerService', function($log, BoardService, GameService, DeckService, PlayerUtilService, Values) {
        var service = {};

        // todo: should this be controlled by gameservice?
        service.resetPlayers = function resetPlayers() {
            DeckService.shuffle();

            var players =  [{
                name: Values.playerOne,
                color: 'red',
                position: 1,
                direction: 1,
                move: null,
                attack: [],
                hand: DeckService.deal(5)
            }, {
                name: Values.playerTwo,
                color: 'blue',
                position: 18,
                direction: -1,
                move: null,
                attack: [],
                hand: DeckService.deal(5)
            }];

            return players;
        };

        service.players = service.resetPlayers();

        service.move = function move(player, direction) {
          if (player.move === null || !direction) {
            return;
          }
          player.position = BoardService.actualMove(player, direction);
          GameService.changePlayer();

          DeckService.discardCards(player.hand.splice(player.move , 1));

          player.hand = PlayerUtilService.dealPlayerHand(player);
          player.move = null; //reset move
        };

        service.attack = function attack(player) {

          var action = {
            attack: PlayerUtilService.attackNumbersMatch(player)
          };

          if (action.attack.number == 0) {
              $log.log('no attack card selected');
              return {error: 'no attack card selected'};
          }

          action.targetLocation =  player.position + player.direction*action.attack.number;
          action.opponentPlayerIndex = BoardService.getPlayerByLocation(action.targetLocation);

          if (action.opponentPlayerIndex == '') {
              $log.log('cannot attack opponent with ', action.attack.number);
              return {error: 'cannot attack opponent with ' + action.attack.number};
          }

          $log.log('attacking opponent player with ', action.attack.number, ' quantity', action.attack.quantity);

          var opponentPlayer = service.players[parseInt(action.opponentPlayerIndex)];

          var resolution = PlayerUtilService.attackOpponent(player, opponentPlayer, action);

          if (resolution.successful) {
            $log.log('opponent cannot block');
            GameService.gameOver();
          };

          GameService.changePlayer();
          player.hand = PlayerUtilService.dealPlayerHand(player);
          service.players[parseInt(action.opponentPlayerIndex)] = opponentPlayer;
        };

        return service;
    });