define(['lib/blaise/vector2'], function(Vector2) {
  function InputManager(eventBus, keyboard) {
    eventBus.subscribe('entityCreation', this.handleEntityCreation, this);
    this.keyboard = keyboard;
  }

  InputManager.prototype = {
    update: function() {
      if(this.player) {
        this.updatePlayer();
      }
    },
    updatePlayer: function() {
      var direction = Vector2.zero();
      var keysPressed = this.keyboard.keysPressed;

      if(keysPressed.right)
        direction.setX(1);
      else if(keysPressed.left)
        direction.setX(-1);

      if(keysPressed.up)
        direction.setY(1);
      else if(keysPressed.down)
        direction.setY(-1);

      var steeringAspect = this.player.aspects.steering;
      if(direction.isZero()) {
        steeringAspect.direction.reset();
      } else {
        direction.normalize();
        steeringAspect.direction = direction;
      }
    },
    handleEntityCreation: function(entityCreationEvent) {
      var entity = entityCreationEvent.entity;
      if(entity.aspects.controlable) {
        if(this.player) {
          throw new Error("Already got player.");
        } else {
          this.player = entity;
        }
      }
    }
  }

  return InputManager;
});
