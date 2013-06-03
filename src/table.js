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

  var ViewOptionsView = function(){
    this.$el = $('<div>');
    this.$gridView = $('<span>Grid View</span>');
    this.$listView = $('<span>List View</span>');
    this.$el.append(this.$gridView).append(this.$listView);
  }

  var Table = function( containerSelector ){
    var that = this;

    var viewOptionsView = new ViewOptionsView();

    this.$el = $(containerSelector);
    this.$el.prepend(viewOptionsView.$el);

    this.$actionEl = $('<div>').addClass('actions hidden').appendTo(this.$el);

    this._diceGroups = {};

    var defaultDiceGroup = new DiceGroup('default');
    this.addDiceGroup(defaultDiceGroup);

    $(document).on('action', function(e, die){
      console.log(die);
    })

    viewOptionsView.$gridView.click(function(){ that.setGridView() });
    viewOptionsView.$listView.click(function(){ that.setListView() });

  };

  Table.prototype.setGridView = function(){
    _.each(this._diceGroups, function(diceGroup){
      diceGroup.setGridView();
    });
    this.render();
  };

  Table.prototype.setListView = function(){
    _.each(this._diceGroups, function(diceGroup){
      diceGroup.setListView();
    });
    this.render();
  };

  Table.prototype.addDiceGroup = function( diceGroup, dice ){
    if ( _.isString(diceGroup) ){
      this.addDiceGroup( new DiceGroup(diceGroup, dice) );
    } else if( _.isArray(diceGroup) ) {
      this.addDiceGroup( new DiceGroup(diceGroup) )
    } else {
      diceGroup.table = this;
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