const blueStart = {
    x: 750,
    y: 550,
};
const orangeStart = {
    x: 50,
    y: 50,
};

class Main extends Phaser.State {
    constructor () {
        super();
        this.trail;
        this.blue;
        this.orange;
        this.keys;
        this.cursors;
        this.bluePastPosition = {
            x: blueStart.x,
            y: blueStart.y,
        };
        this.orangePastPosition = {
            x: orangeStart.x,
            y: orangeStart.y,
        };
    }
    create () {
        //Enable Arcade Physics not sure where to use them yet
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set a black background
        this.game.stage.backgroundColor = '#000000';
        //this.game.add.text(100, 100, 'Shit is weird', {fontSize: '32px', fill: '#FFF'});

        //Handle WASD keys
        let key = this.game.input.keyboard;
        key.addKey(Phaser.Keyboard.W);
        key.addKey(Phaser.Keyboard.S);
        key.addKey(Phaser.Keyboard.A);
        key.addKey(Phaser.Keyboard.D);
        this.keys = {
            up: Phaser.Keyboard.W,
            down: Phaser.Keyboard.S,
            left: Phaser.Keyboard.A,
            right: Phaser.Keyboard.D,
        }
        //Handle arrow keys
        this.cursors = key.createCursorKeys();

        //Blue bike
        this.blue = this.game.add.sprite(32, 32, 'blue-bike');
        this.game.physics.arcade.enable(this.blue);
        this.blue.body.collideWorldBound = true;

        //Orange bike
        this.orange = this.game.add.sprite(750, 550, 'orange-bike');
        this.game.physics.arcade.enable(this.orange);
        this.orange.body.collideWorldBound = true;

        //Trail
        this.trail = game.add.group(); 
    }

    update () {
        let key = this.game.input.keyboard;
        //Reset velocity for both bikes
        this.blue.body.velocity.x = 0;
        this.blue.body.velocity.y = 0;
        this.orange.body.velocity.x = 0;
        this.orange.body.velocity.y = 0;

        if (this.cursors.left.isDown) {
            this.blue.body.velocity.x = -150;
            this.blue.frame = 1;
            this.blue.scale.x = 1;
        } else if (this.cursors.right.isDown) {
            this.blue.body.velocity.x = 150;
            this.blue.frame = 1;
            this.blue.scale.x = -1;
        } else if (this.cursors.up.isDown) {
            this.blue.body.velocity.y = -150;
            this.blue.frame = 2;
            this.blue.scale.y = -1;
        } else if (this.cursors.down.isDown) {
            this.blue.body.velocity.y = 150;
            this.blue.frame = 2;
            this.blue.scale.y = 1;
        }

        if (key.isDown(this.keys.left)) {
            this.orange.body.velocity.x = -150;
            this.orange.frame = 1;
            this.orange.scale.x = 1;
        } else if (key.isDown(this.keys.right)) {
            this.orange.body.velocity.x = 150;
            this.orange.frame = 1;
            this.orange.scale.x = -1;
        } else if (key.isDown(this.keys.up)) {
            this.orange.body.velocity.y = -150;
            this.orange.frame = 2;
            this.orange.scale.y = -1;
        } else if (key.isDown(this.keys.down)) {
            this.orange.body.velocity.y = 150;
            this.orange.frame = 2;
            this.orange.scale.y = 1;
        }

    }
}
