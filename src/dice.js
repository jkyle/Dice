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

    var DieDetailView = function(die){
      this.$el = $('<div>'+die.name+', '+die.numberOfFaces+'</div>').addClass('listView');
    };

    var Die = function(faces, options){
      var that = this;

      this.born = true;
      this.name = options.name;
      this.description = options.description;

      this.faces = [];

      _.each(faces, function(face){
        this.faces.push(new Face(face.type, face.value));
      }, this);

      this.numberOfFaces = faces.length;
      this.activeFace = this.faces[random(this.numberOfFaces)];
      this.rollCount = 0;
      this.locked = false;

      this.$el = $('<div>').addClass('die-container born');
      this.faceView = $('<div>').addClass('die-face').appendTo(this.$el);
      this.detailView = new DieDetailView(this);
      this.detailView.$el.appendTo(this.$el);

      // if(options && options.color){
      //   this.faceView.css('background-color', options.color);
      // }

      this.$el.click(function(e){
        that.toggleLock();
      })

    };

    Die.prototype.getActions = function(){
      return this.actions.concat(this.activeFace.getActions());
    }

    Die.prototype.showActions = function(){
      $(document).trigger('action', [this.getActions()])
    };

    Die.prototype.lock = function(){
      this.locked = true;
      this.$el.addClass('locked');
    };

    Die.prototype.unlock = function(){
      this.locked = false;
      this.$el.removeClass('locked');
    };

    Die.prototype.toggleLock = function(){
      if(this.locked){
        this.unlock();
      } else {
        this.lock();
      }
    }

    Die.prototype.getFace = function(){
      this.activeFace = this.faces[random(this.numberOfFaces)];
    };

    Die.prototype.roll = function(){
      if(this.locked || this.rolling){ return; }

      this.rolling = true;
      this.faceView.addClass('rolling');
      this.rollCount += 1;
      
      var start = new Date().getTime();
      var last = start;
      var that = this;

      that.getFace();
      that.activeFace.render();
      that.faceView.html( that.activeFace.$el );
      var step = function(timestamp){
        var now = new Date().getTime(),
            ds = now - start,
            dt = now - last;
        if(dt > 50){
          that.getFace();
          that.activeFace.render();
          that.faceView.html( that.activeFace.$el );
          last = now;
        }
        if(ds < 500){
          requestAnimationFrame(step);
        } else {
          that.faceView.removeClass('rolling');
          that.rolling = false;
        }

      }

      step();
    }

    Die.prototype.reset = function(){
      this.rollCount = 0;
    };

    Die.prototype.render = function(state){
      var that = this;
      var viewState = state || 'grid';
      this.activeFace.render();
      this.faceView.html( this.activeFace.$el );
      if (viewState === 'list') {
        this.$el.addClass('list');
        this.detailView.$el.show();
        this.$el.removeClass('grid');
      } else {
        this.$el.removeClass('list');
        this.detailView.$el.hide();
        this.$el.addClass('grid');
      }

      if(this.born){
        setTimeout(function(){
          that.$el.removeClass('born');
        }, 0);
        this.born = false;
      }
    };

    return Die;
  }
)
