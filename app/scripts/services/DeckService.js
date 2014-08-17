'use strict';

angular.module('app')
  .service('DeckService', function() {
    var service = {};

    service.cards = [
      1,1,1,1,1, 2,2,2,2,2, 3,3,3,3,3, 4,4,4,4,4, 5,5,5,5,5
    ];

     /* {number: 1}, {number: 1}, {number: 1}, {number: 1}, {number: 1},
      {number: 2}, {number: 2}, {number: 2}, {number: 2}, {number: 2},
      {number: 3}, {number: 3}, {number: 3}, {number: 3}, {number: 3},
      {number: 4}, {number: 4}, {number: 4}, {number: 4}, {number: 4},
      {number: 5}, {number: 5}, {number: 5}, {number: 5}, {number: 5}*/

    service.deck = service.cards.slice(0);
    
    service.discardPile = [];
   
    service.shuffle = function shuffle() {
        for(var j, x, i = service.deck.length; i; j = parseInt(Math.random() * i), x = service.deck[--i], service.deck[i] = service.deck[j], service.deck[j] = x);
    };

    service.deal = function deal(howMany) {
        var numberToDeal = howMany || 1;
        return service.deck.splice(0, numberToDeal);
    };

    service.discardCards = function discardCards(cards) {
        service.discardPile = service.discardPile.concat(cards);
    };
    
    return service;
});