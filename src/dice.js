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
      this.faces = faces;
      this.numberOfFaces = faces.length;
      this.rollCount = 0;
    };

    Dice.prototype.roll = function(){
      this.rollCount += 1;
      return this.faces[random(this.numberOfFaces)];
    }

    Dice.prototype.reset = function(){
      this.rollCount = 0;
    }

    Dice.prototype.render = function(){
      console.log(this);
    }

    return Dice;
  }
)