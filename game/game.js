define([
  'lib/valhalla/event_bus',
  'lib/valhalla/database',
  'lib/valhalla/loop',
  'lib/odin/transformation2d_aspect',
  './renderer'
], function(EventBus, Database, Loop, Transformation2DAspect, Renderer) {
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

      var transformationAspect = new Transformation2DAspect();
      transformationAspect.move(0, 100);
      this.square.addAspect('transformation2D', transformationAspect);
    },
    update: function(timeDelta) {
      this.database.update();

      this.square.aspects.transformation2D.position.components[0] += timeDelta*0.05;

      this.renderer.draw();
    }
  };

  return Game;
});
