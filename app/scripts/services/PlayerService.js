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

        service.move = function move(player, direction) {
            if (player.move === null || !direction) {
              return;
            }
            player.position = BoardService.actualMove(player, direction);
            GameService.changePlayer();

            DeckService.discardCards(player.hand.splice(player.move , 1));
            player.hand = player.hand.concat(DeckService.deal());
            player.move = null; //reset move
        };

        var attackNumbersMatch = function attackNumbersMatch(player) {
          var attackNumber = 0;
          for (var i = 0; i < player.attack.length; i++) {
            if (attackNumber === 0 && player.attack[i] == true) {
              attackNumber = player.hand[i];
            }
            if (attackNumber != 0 && player.attack[i] == true && player.hand[i] != attackNumber) {
              return 0;
            }
          }
          return attackNumber;
        };

        service.attack = function attack(player) {
            $log.log('attack', player.attack);

            var attack = {
              number: attackNumbersMatch(player),
            };

            if (attack.number == 0) {
                return;
            }

            attack.targetLocation =  player.position + player.direction*attack.number;
            attack.opponentPlayerIndex = BoardService.getPlayerByLocation(attack.targetLocation);

            if (attack.opponentPlayerIndex != '') {
                $log.log('attacking opponent player with ', attack.number);
                var opponentPlayer = service.players[attack.opponentPlayerIndex];

            }
            $log.log('cannot attack opponent with ', attack.number);

            // do attack
              // if successfully played then reset attack variable
            // Check if board is anyone is there
            // Attack opponent
            // Tell other player to defend
        };



        return service;
    });