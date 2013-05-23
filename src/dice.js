define(
  [
    'lodash',
    'zepto',
    'face',
    'action'
  ],
  function(
    _,
    $,
    Face,
    Action
  ){

    var random = function(numberOfFaces){ return Math.floor( Math.random() * numberOfFaces ); };

    var Dice = function(faces, options){
      this.$el = $('<div>').addClass("die");

      if(options && options.color){
        this.$el.css('background-color', options.color);
      }

      var that = this;
      // this.$el.click(function(e){ that.roll() });
      this.$el.click(function(e){ that.showActions(); })

      this.faces = [];

      _.each(faces, function(face){
        this.faces.push(new Face(face.type, face.value));
      }, this);
      
      this.numberOfFaces = faces.length;
      this.activeFace = this.faces[random(this.numberOfFaces)];
      this.rollCount = 0;
      this.locked = false;

      this.actions = [
        new Action(this, "Lock", function(){ that.toggleLock() }),
        new Action(this, "Roll", function(){ that.roll()} )
      ]

    };

    Dice.prototype.getActions = function(){
      return this.actions.concat(this.activeFace.getActions());
    }

    Dice.prototype.showActions = function(){
      this.$el.empty()
      _.each(this.getActions(), function(action){
        this.$el.append(action.$el);
      }, this);
    };

    Dice.prototype.lock = function(){
      this.locked = true;
    };

    Dice.prototype.unlock = function(){
      this.locked = false;
    };

    Dice.prototype.toggleLock = function(){
      if(this.locked){
        this.unlock();
      } else {
        this.lock();
      }
    }

    Dice.prototype.getFace = function(){
      this.activeFace = this.faces[random(this.numberOfFaces)];
    }

    Dice.prototype.roll = function(){
      if(this.locked){ return; }

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
