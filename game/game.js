define([
  'lib/valhalla/event_bus',
  'lib/valhalla/database',
  'lib/valhalla/loop',
  'lib/valhalla/keyboard',
  'lib/odin/transformation2d_aspect',
  'lib/odin/rigid_body_aspect',
  'lib/odin/physics/engine',
  'lib/blaise/vector2',
  './input_manager',
  './renderer',
  './steering_manager'
], function(EventBus, Database, Loop, Keyboard, Transformation2DAspect, RigidBodyAspect, PhysicsEngine, Vector2, InputManager, Renderer, SteeringManager) {
  function Game(document) {
    this.setupCanvas();
    var keyboard = new Keyboard(document);
    var eventBus = new EventBus();
    this.database = new Database(eventBus);
    this.loop = new Loop(this);
    this.renderer = new Renderer(eventBus, this.canvasElement);
    this.inputManager = new InputManager(eventBus, keyboard);
    this.steeringManager = new SteeringManager(eventBus);
    this.physicsEngine = new PhysicsEngine(eventBus);
    this.setupWorld();
  }

  Game.prototype = {
    setupCanvas: function() {
      var canvas = document.createElement('canvas');
      canvas.width = 800*window.devicePixelRatio;
      canvas.height = 500*window.devicePixelRatio;
      canvas.style.width = (canvas.width/window.devicePixelRatio) + 'px';
      canvas.style.height = (canvas.height/window.devicePixelRatio) + 'px';
      var context = canvas.getContext('2d');
      context.translate(canvas.width*0.5, canvas.height*0.5);
      context.scale(window.devicePixelRatio, window.devicePixelRatio*-1);
      this.canvasElement = canvas;
    },
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
      player.addAspect('transformation2D', transformationAspect);
      player.addAspect('controlable');
      player.addAspect('steering', { direction: Vector2.zero() });
      player.addAspect('rigidBody', new RigidBodyAspect());
    },
    setupTree: function() {
      var tree = this.database.createEntity();
      tree.addAspect('shapeRendering', { color: 'green' });

      var transformationAspect = new Transformation2DAspect();
      transformationAspect.move(new Vector2(50, -100));
      tree.addAspect('transformation2D', transformationAspect);
    },
    update: function(timeDelta) {
      this.database.update();
      this.inputManager.update();
      this.steeringManager.update(timeDelta);
      this.physicsEngine.update(timeDelta);
      this.renderer.draw();
    }
  };

  return Game;
});
