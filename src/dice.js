define(
  [
    'lodash',
    'zepto'
  ],
  function(
    _,
    $
  ){

    var random = function(numberOfFaces){ return Math.floor( Math.random() * numberOfFaces ) }

    var Dice = function(faces){
      this.$el = $('<div>').addClass("die");

      this.faces = faces;
      this.numberOfFaces = faces.length;
      this.activeFace = this.faces[random(this.numberOfFaces)];
      this.rollCount = 0;
    };

    Dice.prototype.roll = function(){
      this.rollCount += 1;
      this.activeFace = this.faces[random(this.numberOfFaces)];
    }

    Dice.prototype.reset = function(){
      this.rollCount = 0;
    }

    Dice.prototype.render = function(){
      this.$el.html(this.activeFace);
    }

    return Dice;
  }
)