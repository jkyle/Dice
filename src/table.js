define(
 [
  'zepto',
  'lodash',
  'dice',
  'diceGroup'
],function(
  $,
  _,
  Dice,
  DiceGroup
){

  var Table = function( containerSelector ){
    this.$el = $(containerSelector);
    this._diceGroups = {};

    var defaultDiceGroup = new DiceGroup('default');
    this.addDiceGroup(defaultDiceGroup);
  };

  Table.prototype.addDiceGroup = function( diceGroup, dice ){
    if ( _.isString(diceGroup) ){
      this.addDiceGroup( new DiceGroup(diceGroup, dice) );
    } else if( _.isArray(diceGroup) ) {
      this.addDiceGroup( new DiceGroup(diceGroup) )
    } else {
      this._diceGroups[diceGroup.name] = diceGroup;
    }
  };

  Table.prototype.getDiceGroup = function( diceGroupName ){
    var diceGroup = this._diceGroups[diceGroupName];
    if ( diceGroup ){
      return this._diceGroups[diceGroup.name];
    } else {
      throw "Dice Group does not exist.";
    }   
  };

  Table.prototype.addDice = function( dice ){
    this.getDiceGroup('default').addDice( dice );
  };

  Table.prototype.render = function(){
    _.each(this._diceGroups, function(diceGroup){
      this.$el.append(diceGroup.$el);
      diceGroup.render();
    }, this);
  };

  return Table;

});