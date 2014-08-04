'use strict';

angular
    .module('app')
    .service('DeckService', ['$log', function($log) {
      var service = {};

      service.cards = [
          1, 1, 1, 1, 1,
          2, 2, 2, 2, 2,
          3, 3, 3, 3, 3,
          4, 4, 4, 4, 4,
          5, 5, 5, 5, 5
      ];

      service.shuffle = function shuffle() {
        for(var j, x, i = service.cards.length; i; j = parseInt(Math.random() * i), x = service.cards[--i], service.cards[i] = service.cards[j], service.cards[j] = x);
      };

    }]);