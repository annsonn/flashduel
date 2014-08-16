'use strict';

angular.module('app')
    .service('PlayerService', function($log, BoardService, GameService, DeckService) {
        var service = {};

        service.resetPlayers = function resetPlayers() {
            DeckService.shuffle();

            var players =  [{
                name: 'Player 1',
                color: 'red',
                position: 1,
                direction: 1,
                move: 0,
                hand: DeckService.deal(5)
            }, {
                name: 'Player 2',
                color: 'blue',
                position: 18,
                direction: -1,
                move: 0,
                hand: DeckService.deal(5)
            }];

            return players;
        };


        service.players = service.resetPlayers();

        service.move = function move(player, direction) {
            if (player.move === 0 || !direction) {
              return;
            }
            player.move = parseInt(player.move);

            player.position = BoardService.actualMove(player, direction);
            GameService.changePlayer();

            DeckService.discardCards(player.hand.splice(player.hand.indexOf(player.move), 1));
            player.hand = player.hand.concat(DeckService.deal());
            player.move = 0; //reset move
        };

        service.attack = function attack(player, distance) {
            // Check if board is anyone is there
            // Attack opponent
            // Tell other player to defend
        };

        return service;
    });