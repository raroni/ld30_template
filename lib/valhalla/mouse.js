define(function() {
  function Mouse(window, canvasElement, eventBus) {
    this.window = window;
    this.document = window.document;
    this.canvasElement = canvasElement;
    this.moveHandler = this.handleMove.bind(this);
    this.downHandler = this.handleDown.bind(this);
    this.resume();
    this.eventBus = eventBus;
  }

  Mouse.prototype = {
    resume: function() {
      this.document.addEventListener('mousemove', this.moveHandler);
      this.canvasElement.addEventListener('mousedown', this.downHandler);
    },
    handleMove: function(event) {
      var aspectRatio = this.canvasElement.width/this.canvasElement.height;

      var left = event.pageX-this.canvasElement.offsetLeft;
      var width = this.canvasElement.width/this.window.devicePixelRatio;
      this.x = ((left/width)*2-1)*aspectRatio;

      var top = event.pageY-this.canvasElement.offsetTop;
      var height = this.canvasElement.height/this.window.devicePixelRatio;
      this.y = ((top/height)*2-1)*-1;

      var event = {
        type: 'mouseMove',
        x: this.x,
        y: this.y
      };
      this.eventBus.emit(event);
    },
    handleDown: function() {
      var event = {
        type: 'mouseDown',
        x: this.x,
        y: this.y
      }
      this.eventBus.emit(event);
    }
  };

  return Mouse;
});
