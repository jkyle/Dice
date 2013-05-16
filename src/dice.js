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
      var that = this;
      this.$el.click(function(e){ that.spin() })
      this.faces = faces;
      this.numberOfFaces = faces.length;
      this.activeFace = this.faces[random(this.numberOfFaces)];
      this.rollCount = 0;
    };

    Dice.prototype.roll = function(){
      this.rollCount += 1;
      this.activeFace = this.faces[random(this.numberOfFaces)];
    }

    Dice.prototype.spin = function(){
      this.$el.addClass('rolling');
      var start = new Date().getTime();
      var last = start;
      var that = this;

      that.roll();
      that.render();

      var step = function(timestamp){
        var now = new Date().getTime(),
            ds = now - start,
            dt = now - last;
        if(dt > 50){
          that.roll();
          that.render();
          last = now;
        }
        if(ds < 400){
          requestAnimationFrame(step);
        } else {
          that.$el.removeClass('rolling');
        }

      }

      step();
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