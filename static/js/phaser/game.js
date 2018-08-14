class Game extends Phaser.Game {
  constructor () {
    super(800, 600, Phaser.AUTO);

    this.state.add('boot', Boot, false);
    this.state.add('preload', PreLoad, false);
    this.state.add('gametitle', GameTitle, false);
    this.state.add('main', Main, false);
    this.state.add('gameover', GameOver, false);

    this.state.start('boot');
  }
}

new Game();