define(
  [
    'lodash',
    'zepto',
    'face'
  ],
  function(
    _,
    $,
    Face
  ){

    var random = function(numberOfFaces){ return Math.floor( Math.random() * numberOfFaces ); };

    var Dice = function(faces, options){
      this.$el = $('<div>').addClass("die");

      if(options && options.color){
        this.$el.css('background-color', options.color);
      }

      var that = this;
      this.$el.click(function(e){ that.roll() });

      this.faces = [];

      _.each(faces, function(face){
        this.faces.push(new Face(face.type, face.value));
      }, this);
      
      this.numberOfFaces = faces.length;
      this.activeFace = this.faces[random(this.numberOfFaces)];
      this.rollCount = 0;
    };

    Dice.prototype.getFace = function(){
      this.activeFace = this.faces[random(this.numberOfFaces)];
    }

    Dice.prototype.roll = function(){
      this.$el.addClass('rolling');
      this.rollCount += 1;
      
      var start = new Date().getTime();
      var last = start;
      var that = this;

      that.getFace();
      that.render();

      var step = function(timestamp){
        var now = new Date().getTime(),
            ds = now - start,
            dt = now - last;
        if(dt > 50){
          that.getFace();
          that.render();
          last = now;
        }
        if(ds < 500){
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
      this.activeFace.render();
      this.$el.html( this.activeFace.$el ) ;
    }

    return Dice;
  }
)
