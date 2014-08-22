define(['lib/blaise/vector2'], function(Vector2) {
  function Transformation2D() {
    this.position = new Vector2();
    this.orientation = 0;
  }

  Transformation2D.prototype.move = function(translation) {
    this.position.add(translation);
  };

  return Transformation2D;
});
