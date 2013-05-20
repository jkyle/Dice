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

  var faces = [
    {type:'text', value: ''},
    {type:'text', value: ''},
    {type:'svg', value:FocusImage},
    {type:'svg', value:FocusImage},
    {type:'svg', value:HitImage},
    {type:'svg', value:HitImage},
    {type:'svg', value:HitImage},
    {type:'svg', value:CriticalImage}
  ]

  var AttackDice = function(options){
    var opts = _.extend({}, options)
    Dice.call(this, faces, opts)
  }

  AttackDice.prototype = Dice.prototype;

  return AttackDice

})