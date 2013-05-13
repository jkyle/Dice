define(
[
  'zepto',
  'lodash',
  'dice'
], function(
  $,
  _,
  Dice
){

  var DiceGroup = function( name, dice ){
    if( dice && _.isArray(dice) ) {
      this._dice = dice;
    } else if ( dice ) {
      this._dice = [dice];
    } else if ( name && _.isArray(name) ){
      this.name = _.uniqueId();
      this._dice = name;
    } else if ( name && _.isString(name) ){
      this.name = name;
      this._dice = [];
    } else if ( name ){
      this.name = _.uniqueId();
      this._dice = [name];
    } else {
      this.name = _.uniqueId();
      this._dice = [];
    }
  };

  DiceGroup.prototype.getDice = function(){
    return this._dice;
  }

  DiceGroup.prototype.addDice = function( dice ){
    if ( _.isArray(dice) ) {
      this.dice = this.dice.concat(dice);
    } else {
      this.dice.push( dice );
    }
  }

  DiceGroup.prototype.render = function(){
    _.each(this.dice, function(die){
      die.render();
    });
  }

  return DiceGroup;

})