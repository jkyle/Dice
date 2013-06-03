define(
[
  'dice'
],
function(
  Dice
){

  var faces = [
    {type:'text',value:1},
    {type:'text',value:2},
    {type:'text',value:3},
    {type:'text',value:4},
    {type:'text',value:5},
    {type:'text',value:6},
    {type:'text',value:7},
    {type:'text',value:8},
    {type:'text',value:9},
    {type:'text',value:0}
  ];

  var TenSided = function(options){
    var opts = _.extend({
      color: '#f2340a',
      name: 'Ten Sided'
    }, options)
    Dice.call(this, faces, opts)
  };

  TenSided.prototype = Dice.prototype;

  return TenSided

})