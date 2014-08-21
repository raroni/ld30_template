define(['lib/blaise/vector2'], function(Vector2) {
  function Transformation2D() {
    this.position = new Vector2();
    this.orientation = 0;
  }

  Transformation2D.prototype.move = function(xChange, yChange) {
    var change = new Vector2(xChange, yChange);
    this.position.add(change);
  };

  return Transformation2D;
});
