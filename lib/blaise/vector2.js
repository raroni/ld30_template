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
    setX: function(x) {
      this.components[0] = x;
    },
    setY: function(y) {
      this.components[1] = y;
    },
    isZero: function() {
      return this.components[0] == 0 && this.components[1] == 0;
    },
    divide: function(divisor) {
      this.set(Vector2.divide(this, divisor));
    },
    normalize: function() {
      this.divide(this.getLength());
    },
    getLength: function() {
      return Math.sqrt(this.getSquaredLength());
    },
    getSquaredLength: function() {
      return Math.pow(this.components[0], 2) + Math.pow(this.components[1], 2);
    },
    reset: function() {
      this.setX(0);
      this.setY(0);
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

  Vector2.divide = function(vector, divisor) {
    var result = new Vector2(
      vector.get(0)/divisor,
      vector.get(1)/divisor
    );
    return result;
  };

  Vector2.zero = function() {
    var zero = new Vector2(0, 0);
    return zero;
  }

  return Vector2;
})
