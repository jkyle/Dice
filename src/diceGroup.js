define(
[
  'zepto',
  'lodash',
  'dice',

  'text!images/roll.svg',
  'text!images/add.svg',

  'dice/tenSided',
  'dice/attackDice',
  'dice/directional'
], function(
  $,
  _,
  Dice,

  RollImage,
  AddImage,
  
  AttackDice,
  TenSided,
  Directional
){

  var newDiceList = [AttackDice, TenSided, Directional];

  var newDiceListView = function(diceGroup){
    this.$el = $('<div>');
    
    _.each(newDiceList, function(die){
      var newDie = new die({color: '#ccc'});
      this.$el.append(newDie.$el);
      newDie.$el.click(function(){
        diceGroup.addDice(new die());
      })
      newDie.render();
    }, this)

    return this.$el;
  }

  var ActionContainer = function(diceGroup){
    this.$el = $('<div>').addClass('listWrapper');
    
    var rollButton = new RollAllButton(diceGroup);
    this.$el.append(rollButton);

    var newDiceButton = new NewDiceButton();
    this.$el.append(newDiceButton);
    
    var newDice = new newDiceListView(diceGroup);
    this.$el.append(newDice.hide());

    newDiceButton.click(function(){
      rollButton.hide();
      newDiceButton.hide();
      newDice.show();
    })

    return this.$el;
  }

  var NewDiceButton = function(diceGroup){
    this.$el = $('<div>').addClass('die button');
    this.$el.html(AddImage);
    return this.$el;
  }

  var RollAllButton = function(diceGroup){
    this.$el = $('<div>').addClass('die button');
    this.$el.html(RollImage);
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
    this.render();
  }

  DiceGroup.prototype.rollAll = function(){
    _.each(this._dice, function(die){
      die.roll();
    })
  }

  DiceGroup.prototype.render = function(){
    this.$el.empty();
    _.each(this._dice, function(die){
      this.$el.append(die.$el);
      die.render();
    }, this);
    this.$el.append(new ActionContainer(this));
  }

  return DiceGroup;

})