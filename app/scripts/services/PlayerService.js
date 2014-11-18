'use strict';

angular.module('app')
    .service('PlayerService', function($log, BoardService, GameService, DeckService, PlayerUtilService, Values) {
        var service = {};

        var turnOver = function(player){
            GameService.changePlayer();
            player.move = null; //reset move
            player.attack = null;
        };

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
                dashingStrike: {
                  move: null,
                  attack: []
                },
                hand: DeckService.deal(5)
            }, {
                name: Values.playerTwo,
                color: 'blue',
                position: 18,
                direction: -1,
                move: null,
                attack: [],
                dashingStrike: {
                  move: null,
                  attack: []
                },
                hand: DeckService.deal(5)
            }];

            return players;
        };

        service.players = service.resetPlayers();

        service.move = function move(player, direction) {
          player.position = BoardService.actualMove(player, direction);

          DeckService.discardCards(player.hand.splice(player.move , 1));
          player.hand = PlayerUtilService.dealPlayerHand(player);
          turnOver(player);
        };

        service.attack = function attack(player, attack) {

          var action = { attack: attack };

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

        service.dashStrike = function dashingStrike(player) {
          // check if attack numbers match
          // check if attack + move is a valid move

          // move player to that spot
          // attack player with that spot

          // block or retreat to opposing player
            // if cant retreat or block then game over

        };

        return service;
    });
