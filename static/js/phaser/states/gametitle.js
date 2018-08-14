class GameTitle extends Phaser.State {
  create () {
    this.game.state.start('main');
  }
}