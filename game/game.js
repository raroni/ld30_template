define([
  'lib/valhalla/event_bus',
  'lib/valhalla/database',
  'lib/valhalla/loop',
  'lib/valhalla/keyboard',
  'lib/odin/transformation2d_aspect',
  'lib/blaise/vector2',
  './input_manager',
  './renderer'
], function(EventBus, Database, Loop, Keyboard, Transformation2DAspect, Vector2, InputManager, Renderer) {
  function Game(document) {
    this.canvasElement = document.createElement('canvas');

    var keyboard = new Keyboard(document);
    var eventBus = new EventBus();
    this.database = new Database(eventBus);
    this.loop = new Loop(this);
    this.renderer = new Renderer(eventBus, this.canvasElement);
    this.inputManager = new InputManager(eventBus, keyboard);
    this.setupWorld();
  }

  Game.prototype = {
    run: function() {
      this.loop.start();
    },
    setupWorld: function() {
      this.setupPlayer();
      this.setupTree();
    },
    setupPlayer: function() {
      var player = this.database.createEntity();
      player.addAspect('shapeRendering', { color: 'blue' });

      var transformationAspect = new Transformation2DAspect();
      transformationAspect.move(200, 100);
      player.addAspect('transformation2D', transformationAspect);
      player.addAspect('controlable');
      player.addAspect('steering', { direction: Vector2.zero() });
    },
    setupTree: function() {
      var tree = this.database.createEntity();
      tree.addAspect('shapeRendering', { color: 'green' });

      var transformationAspect = new Transformation2DAspect();
      transformationAspect.move(50, 100);
      tree.addAspect('transformation2D', transformationAspect);
    },
    update: function(timeDelta) {
      this.database.update();
      this.inputManager.update();
      this.renderer.draw();
    }
  };

  return Game;
});
