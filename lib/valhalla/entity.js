define(function() {
  function Entity(database) {
    this.database = database;
    this.aspects = {};
  }

  Entity.prototype.addAspect = function(type, aspect) {
    if(!aspect) aspect = {};
    this.database.addAspect(this, type, aspect);
  };

  return Entity;
});
