class GameOver extends Phaser.State {
  create () {

  }

  reatartGmae () {
    this.game.state.start('main');
  }
}