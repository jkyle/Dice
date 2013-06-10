define(
[
  'zepto',
  'lodash'
],
function(
  $,
  _
){

  var Face = function(faceType, face){
    this.faceType = faceType;
    this.$el = $('<div>').addClass('face');
    this.actions = [];

    this.face = face;
  }

  Face.prototype.getActions = function(){
    return this.actions;
  }

  Face.prototype.lock = function(){
    this.$el.css('background-color', '#ddd');
  }

  Face.prototype.unlock = function(){
    this.$el.css('background-color', 'transparent');
  }

  Face.prototype.render = function(){
    this.$el.html(this.face);
    return this.$el;
  };

  return Face;

})