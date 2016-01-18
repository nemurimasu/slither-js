(function() {
  'use strict';

  function GameOver() {}

  GameOver.prototype = {
    create: function () {
      var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5,
        'You lose! Press C to play again.', {font: '42px Arial', fill: '#ff0000', align: 'center'
      });
      text.anchor.set(0.5);
      this.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
      this.cKey.onDown.add(this.replay, this);
    },

    update: function () {

    },

    replay: function () {
      this.game.state.start('game');
    }
  };

  window['slither'] = window['slither'] || {};
  window['slither'].GameOver = GameOver;
}());
