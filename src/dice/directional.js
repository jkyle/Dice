define(
[
  'dice',
  'text!images/arrow.svg',
],
function(
  Dice,
  ArrowImage
){

  var randomDegree = function(){
    return Math.random() * 360;
  };

  var faces = [
    {type:'svg', value:ArrowImage}
  ]

  var Directional = function(options){
    var opts = _.extend({ color: '#348854'}, options)
    Dice.call(this, faces, opts)
  }

  var Surrogate = function(){ this.constructor = Directional; };
  Surrogate.prototype = Dice.prototype;
  Directional.prototype = new Surrogate;

  Directional.prototype.getFace = function(){
    this.activeFace.$el.css('-webkit-transform', 'rotateZ('+randomDegree()+'deg)');
  }

  return Directional

})