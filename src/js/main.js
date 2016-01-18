window.addEventListener('load', function () {
  'use strict';

  var ns = window['slither'];
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'slither-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('gameOver', ns.GameOver);
  game.state.add('game', ns.Game);
  /* yo phaser:state new-state-files-put-here */
  game.state.start('boot');
}, false);
