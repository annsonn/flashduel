'use strict';

angular.module('app')
    .service('PlayerService', function($log, BoardService, GameService, DeckService, Values) {
        var service = {};

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

        var DealPlayerHand = function DealPlayerHand(player) {
          var missingCards = 5 - player.hand.length;

          for (var i = 0; i < missingCards; i++) {
            player.hand = player.hand.concat(DeckService.deal(1));
          }
          return player.hand;

        };

        service.move = function move(player, direction) {
          if (player.move === null || !direction) {
            return;
          }
          player.position = BoardService.actualMove(player, direction);
          GameService.changePlayer();

          DeckService.discardCards(player.hand.splice(player.move , 1));

          player.hand = DealPlayerHand(player);
          player.move = null; //reset move
        };

        var attackNumbersMatch = function attackNumbersMatch(player) {
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

        service.attack = function attack(player) {
          $log.log('attack', player.attack, player.hand);

          var action = {
            attack: attackNumbersMatch(player),
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

          $log.log('opponentPlayer', opponentPlayer);

          for (var i = 0; i < action.attack.quantity; i++) {
            var opponentCanBlock = opponentPlayer.hand.indexOf(action.attack.number);
            if (opponentCanBlock == -1) {
              GameService.changePlayer();
              GameService.gameOver();
              $log.log('opponent cannot block');
              return {success: 'opponent cannot block'};
            }
            opponentPlayer.hand.splice(opponentCanBlock, 1);
            $log.log('opponent blocked 1 attack', opponentPlayer.hand);
            player.hand.splice(player.hand.indexOf(action.attack.number), 1);
          }

          GameService.changePlayer();
          player.hand = DealPlayerHand(player);
          service.players[parseInt(action.opponentPlayerIndex)] = opponentPlayer;
          $log.log('opponent blocked attack', opponentPlayer.hand);
          return {failed: 'opponent blocked attack'};

        };

        return service;
    });