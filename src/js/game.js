(function() {
  'use strict';
  
  var colors = {
    white: 0xffffff,
    black: 0x000000,
    red: 0xff0000,
    green: 0x009b00,
  };

  function Game() {}

  Game.prototype = {
    create: function () {
      var leadY = this.game.width / 2;
      var leadX = this.game.height / 2;
      this.leadXChange = 0;
      this.leadYChange = 0;
      
      this.blockSize = 10;
      
      this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      this.leftKey.onDown.add(this.moveLeft, this);
      this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      this.rightKey.onDown.add(this.moveRight, this);
      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.upKey.onDown.add(this.moveUp, this);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
      this.downKey.onDown.add(this.moveDown, this);
      this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
      ]);
      
      var bg = this.game.add.graphics(0, 0);
      bg.beginFill(colors.white, 1);
      bg.drawRect(0, 0, this.game.width, this.game.height);
      
      this.snakeList = [this.makeSnakeSegment(leadX, leadY)];
      
      var apple = this.apple = this.game.add.graphics(0, 0);
      apple.beginFill(colors.red, 1);
      apple.drawRect(0, 0, this.blockSize, this.blockSize);
      
      this.placeApple();
    },
    
    placeApple: function() {
      this.apple.x = this.blockSize * Math.floor(Math.random() * (this.game.width / this.blockSize - 1));
      this.apple.y = this.blockSize * Math.floor(Math.random() * (this.game.height / this.blockSize - 1));
    },
    
    makeSnakeSegment: function(x, y) {
      var segment = this.game.add.graphics(x, y);
      segment.beginFill(colors.green, 1);
      segment.drawRect(0, 0, this.blockSize, this.blockSize);
      return segment;
    },

    update: function () {
      this.moveSnake();
      this.checkBoundaries();
      // do this *before* apple-related growth or you will not be able to grow
      this.checkSelfCollisions();
      this.checkAppleCollisions();
    },
    
    moveSnake: function() {
      var first = this.snakeList[0];
      var last = this.snakeList[this.snakeList.length - 1];
      last.x = first.x + this.leadXChange;
      last.y = first.y + this.leadYChange;
      this.snakeList = [last].concat(this.snakeList.slice(0, this.snakeList.length - 1));
    },
    
    checkBoundaries: function() {
      var first = this.snakeList[0];
      if (0 > first.x || first.x >= this.game.width ||
        0 > first.y || first.y >= this.game.height) {
        this.game.state.start('gameOver');
      }
    },
    
    checkSelfCollisions: function() {
      var first = this.snakeList[0];
      for (var i = 1; i < this.snakeList.length; i++) {
        if (first.x === this.snakeList[i].x && first.y === this.snakeList[i].y) {
          this.game.state.start('gameOver');
        }
      }
    },
    
    checkAppleCollisions: function() {
      var first = this.snakeList[0];
      var last = this.snakeList[this.snakeList.length - 1];
      if (first.x === this.apple.x && first.y === this.apple.y) {
        last = this.makeSnakeSegment(last.x, last.y);
        this.snakeList.push(last);
        this.placeApple();
      }
    },

    moveLeft: function () {
      this.leadXChange = -this.blockSize;
      this.leadYChange = 0;
    },

    moveRight: function () {
      this.leadXChange = this.blockSize;
      this.leadYChange = 0;
    },

    moveUp: function () {
      this.leadXChange = 0;
      this.leadYChange = -this.blockSize;
    },

    moveDown: function () {
      this.leadXChange = 0;
      this.leadYChange = this.blockSize;
    },
  };

  window['slither'] = window['slither'] || {};
  window['slither'].Game = Game;
}());
