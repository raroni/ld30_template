define(['lib/blaise/vector2'], function(Vector2) {
  function SteeringManager(eventBus) {
    eventBus.subscribe('entityCreation', this.handleEntityCreation, this);
    this.entities = [];
  }

  SteeringManager.prototype = {
    update: function(timeDelta) {
      this.entities.forEach(function(entity) {
        var aspects = entity.aspects;
        var force = Vector2.multiply(aspects.steering.direction, timeDelta*0.02);
        aspects.rigidBody.force.add(force);
      });
    },
    handleEntityCreation: function(entityCreationEvent) {
      var entity = entityCreationEvent.entity;
      if(entity.aspects.steering) {
        this.entities.push(entity);
      }
    }
  };

  return SteeringManager;
});
