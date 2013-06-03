define(
  [
    'lodash',
    'zepto'
  ],
  function(
    _,
    $
  ){

    var Action = function(dice, icon, callback){
      this.$el = $('<div>').html(icon).addClass('die');
      this.$el.click( function(){
        callback(dice);
      } )
    }

    Action.prototype.render = function(){
      return this.$el;
    }

    return Action;

  }
)