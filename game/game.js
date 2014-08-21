define([
  'lib/valhalla/event_bus',
  'lib/valhalla/database',
  'lib/valhalla/loop',
  './renderer'
], function(EventBus, Database, Loop, Renderer) {
  function Game(containerElement) {
    this.canvasElement = document.createElement('canvas');
    var eventBus = new EventBus();
    this.database = new Database(eventBus);
    this.loop = new Loop(this);
    this.renderer = new Renderer(eventBus, this.canvasElement);
    this.setupWorld();
  }

  Game.prototype = {
    run: function() {
      this.loop.start();
    },
    setupWorld: function() {
      this.square = this.database.createEntity();
      this.square.addAspect('shapeRendering', { color: 'blue' });
    },
    update: function(timeDelta) {
      this.database.update();
      this.renderer.draw();
    }
  };

  return Game;
});
