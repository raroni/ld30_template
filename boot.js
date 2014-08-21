require.config({
  paths: {

  }
});

require(['vendor/domReady', 'game/game'], function(domReady, Game) {
  function initialize() {
    var game = new Game();
    var containerElement = document.querySelector('body > .game_container');
    containerElement.appendChild(game.canvasElement);
    game.run();
  }

  domReady(initialize);
});
