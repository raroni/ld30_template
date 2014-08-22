define(function() {
  function Renderer(eventBus, canvasElement) {
    this.canvasElement = canvasElement;
    this.context = canvasElement.getContext('2d');

    eventBus.subscribe('entityCreation', this.handleCreation, this);

    this.entities = [];

    this.backgroundGradient = this.context.createRadialGradient(100, 100, 10, 100, 100, 600);
    this.backgroundGradient.addColorStop(0, '#8ED6FF');
    this.backgroundGradient.addColorStop(1, '#004CB3');
  }

  Renderer.prototype = {
    draw: function() {
      this.clear();

      this.entities.forEach(function(entity) {
        var aspects = entity.aspects;
        var transformationAspect = aspects.transformation2D;
        var size = 80;
        this.context.save();
        this.context.translate(
          Math.round(transformationAspect.position.get(0)),
          Math.round(transformationAspect.position.get(1))
        );
        this.context.fillStyle = aspects.shapeRendering.color;

        this.context.fillRect(-size*0.5, -size*0.5, size, size);
        /*
        this.context.beginPath();
        this.context.arc(0, 0, 40, 0, 2*Math.PI);
        this.context.fill();
        */
        this.context.restore();
      }.bind(this));
    },
    handleCreation: function(creationEvent) {
      var entity = creationEvent.entity;
      if(entity.aspects.shapeRendering) {
        this.entities.push(entity);
      }
    },
    clear: function() {
      this.context.fillStyle = this.backgroundGradient;
      this.context.fillRect(-this.canvasElement.width*0.5, -this.canvasElement.height*0.5, this.canvasElement.width, this.canvasElement.height);
    }
  };

  return Renderer;
});
