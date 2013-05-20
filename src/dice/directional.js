define(
[
  'dice',
  'text!images/hit.svg',
  'text!images/critical.svg',
  'text!images/focus.svg'
],
function(
  Dice,
  HitImage,
  CriticalImage,
  FocusImage
){

  var randomDegree = function(){
    return Math.random() * 360;
  };

  var faces = [
    {type:'svg', value:FocusImage}
  ]

  var Directional = function(options){
    var opts = _.extend({}, options)
    Dice.call(this, faces, opts)
  }

  var Surrogate = function(){ this.constructor = Directional; };
  Surrogate.prototype = Dice.prototype;
  Directional.prototype = new Surrogate;

  Directional.prototype.getFace = function(){
    this.$el.css('-webkit-transform', 'rotateZ('+randomDegree()+')');
  }

  return Directional

})