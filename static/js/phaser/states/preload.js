class PreLoad extends Phaser.State {
  preload () {
    this.game.load.spritesheet('blue-bike', 'static/sprites/blue-bike.png', 31, 31);
    this.game.load.spritesheet('orange-bike', 'static/sprites/orange-bike.png', 31, 31);
    this.game.load.image('blue-trail', 'static/sprites/blue-trail.png', 32, 32);
    this.game.load.image('orange-trail', 'static/sprites/orange-trail.png', 32, 32);
  }

  create () {
    this.game.state.start('gametitle');
  }
}