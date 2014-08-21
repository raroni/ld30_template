define(function() {
  function Vector2(x, y) {
    if(!x) x = 0;
    if(!y) y = 0;
    this.components = [x, y];
  }

  Vector2.prototype = {
    add: function(vector) {
      this.set(Vector2.add(this, vector));
    },
    set: function(vector) {
      this.components[0] = vector.get(0);
      this.components[1] = vector.get(1);
    },
    get: function(index) {
      return this.components[index];
    }
  };

  Vector2.add = function(vector1, vector2) {
    var result = new Vector2(
      vector1.get(0) + vector2.get(0),
      vector1.get(1) + vector2.get(1)
    );
    return result;
  };

  return Vector2;
})
