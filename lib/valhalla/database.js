define(['lib/valhalla/entity'], function(Entity) {
  function Database(eventBus) {
    this.eventBus = eventBus;
    this.entityCreations = [];
    this.aspectInsertions = [];
  }

  Database.prototype = {
    update: function() {
      this.aspectInsertions.forEach(function(insertion) {
        insertion.entity.aspects[insertion.aspectType] = insertion.aspect;
      });
      this.aspectInsertions.length = 0;

      this.entityCreations.forEach(function(entity) {
        var event = { type: 'entityCreation', entity: entity };
        this.eventBus.emit(event);
      }.bind(this));
      this.entityCreations.length = 0;
    },
    createEntity: function() {
      var entity = new Entity(this);
      this.entityCreations.push(entity);
      return entity;
    },
    addAspect: function(entity, aspectType, aspect) {
      var insertion = {
        entity: entity,
        aspectType: aspectType,
        aspect: aspect
      };
      this.aspectInsertions.push(insertion);
    }
  };

  return Database;
});
