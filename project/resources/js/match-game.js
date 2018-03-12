var MatchGame = {};

$(document).ready( () => {
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $('#game'));
})

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var values = [];
  for (var i = 1; i <= 8; i++) {
    values.push(i);
    values.push(i);
  }

  var cardValues = [];

  while (values.length > 0) {
    var randomIndex = Math.floor(Math.random() * values.length);
    randomValue = values.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)'];
  $game.empty();

  for (i = 0; i < cardValues.length; i++) {
    var $cardElement = $('<div class="col-sm-3 card"></div>');
    $cardElement.data({value: cardValues[i], isFlipped: false, color: colors[cardValues[i] - 1]});

    $game.append($cardElement);
    $game.data('flippedCards', []);

  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  })
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if ($card.data('isFlipped')) {
    return;
  }
  $card.css('background-color', $card.data('color')).text($card.data('value')).data('isFlipped', true);
  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      }
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('isFlipped', false);
      }, 350);
    }
    $game.data('flippedCards', []);
  }
};