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

  var NewDiceButton = function(){
    this.$el = $('<div>');
    this.$el.click(function(){

    })
  }

  var RollAllButton = function(diceGroup){
    this.$el = $('<div>Roll All</div>');
    this.$el.click(function(){
      diceGroup.rollAll();
    });
    return this.$el;
  }

  var DiceGroup = function( name, dice ){
    this.$el = $('<div>');
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
      this._dice = this._dice.concat(dice);
    } else {
      this._dice.push( dice );
    }
  }

  DiceGroup.prototype.rollAll = function(){
    _.each(this._dice, function(die){
      die.roll();
    })
  }

  DiceGroup.prototype.render = function(){
    _.each(this._dice, function(die){
      this.$el.append(die.$el);
      die.render();
    }, this);
    this.$el.append(new RollAllButton(this));
  }

  return DiceGroup;

})