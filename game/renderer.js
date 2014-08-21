define(function() {
  function Renderer(eventBus, canvasElement) {
    this.canvasElement = canvasElement;
    this.context = canvasElement.getContext('2d');

    eventBus.subscribe('entityCreation', this.handleCreation, this);

    this.entities = [];
  }

  Renderer.prototype = {
    draw: function() {
      this.context.fillStyle = '#fff';
      this.context.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);

      this.entities.forEach(function(entity) {
        var size = 80;
        this.context.save();
        this.context.translate(this.canvasElement.width/2, this.canvasElement.height/2);
        this.context.fillStyle = entity.aspects.shapeRendering.color;
        this.context.fillRect(-size*0.5, -size*0.5, size, size);
        this.context.restore();
      }.bind(this));
    },
    handleCreation: function(creationEvent) {
      var entity = creationEvent.entity;
      if(entity.aspects.shapeRendering) {
        this.entities.push(entity);
      }
    }
  };

  return Renderer;
});
