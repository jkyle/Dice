define(
[
  'zepto',
  'lodash',
  'dice',

  'text!images/roll.svg',
  'text!images/add.svg',
  'text!images/remove.svg',

  'dice/tenSided',
  'dice/attackDice',
  'dice/directional'
], function(
  $,
  _,
  Dice,

  RollImage,
  AddImage,
  RemoveImage,
  
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

  var NewDiceButton = function(diceGroup){
    this.$el = $('<div>').addClass('die-container button');
    this.$face = $('<div>').addClass('die-face').appendTo(this.$el);
    this.$face.html(AddImage);
    
    return this;
  }

  var RemoveDiceButton = function(diceGroup){
    this.$el = $('<div>').addClass('die-container button');
    this.$face = $('<div>').addClass('die-face').appendTo(this.$el);
    this.$face.html(RemoveImage);
    
    return this;
  }

  var RollAllButton = function(diceGroup){
    this.$el = $('<div>').addClass('die-container button');
    this.$face = $('<div>').addClass('die-face').appendTo(this.$el);
    this.$face.html(RollImage);

    return this;
  }

  var ActionContainer = function(diceGroup){
    this.$el = $('<div>').addClass('listWrapper');
    
    var rollButton = new RollAllButton(diceGroup);
    this.$el.append(rollButton.$el);

    var newDiceButton = new NewDiceButton();
    this.$el.append(newDiceButton.$el);
    
    var removeDiceButton = new RemoveDiceButton();
    this.$el.append(removeDiceButton.$el);

    var newDice = new newDiceListView(diceGroup);
    this.$el.append(newDice.hide());

    var evt;
    if(Modernizr.touch){
      evt = 'tap';
    } else {
      evt = 'click';
    }

    newDiceButton.$el.on(evt, function(){
      rollButton.$el.hide();
      newDiceButton.$el.hide();
      newDice.show();
    })

    rollButton.$el.on(evt,function(){
      diceGroup.rollAll();
    });

    removeDiceButton.$el.on(evt,function(){
      diceGroup.removeSelected();
    })

    return this.$el;
  }


  var DiceGroup = function( name, dice ){
    this.$el = $('<div>').addClass('dice-group');
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

    this.viewType = 'grid';
  };

  DiceGroup.prototype.setListView = function(){
    this.viewType = 'list';
  };

  DiceGroup.prototype.setGridView = function(){
    this.viewType = 'grid';
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

  DiceGroup.prototype.getActions = function(){
    var actions = [];

    if( this.getDice().length > 0 ){
      actions.push('rollAll');

      _.each(this.getDice(), function(die){
        actions = actions.concat(die.getActions());
      });
    }

  };

  DiceGroup.prototype.rollAll = function(){
    _.each(this._dice, function(die){
      die.roll();
    })
  }

  DiceGroup.prototype.removeSelected = function(){
    _.each(this._dice, function(die){
      if(die.selected){
        die.destroy();
        this._dice[_.indexOf(this._dice, die)] = 0;
      }
    }, this)
    this._dice = _.compact(this._dice);
    this.render();
  }

  DiceGroup.prototype.render = function(){
    this.$el.empty();
    _.each(this._dice, function(die){
      this.$el.append(die.$el);
      die.render(this.viewType);
      // die.$el.removeClass('born');
    }, this);
    this.$el.append(new ActionContainer(this));
  }

  return DiceGroup;

})