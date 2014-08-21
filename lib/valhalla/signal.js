define(function() {
  function Signal() {
    this.callbacks = [];
  }

  Signal.prototype = {
    subscribe: function(_function, context) {
      var callback = {
        _function: _function,
        context: context
      };
      this.callbacks.push(callback);
    },
    emit: function(event) {
      this.callbacks.forEach(function(callback) {
        callback._function.call(callback.context, event);
      });
    }
  };

  return Signal;
});
