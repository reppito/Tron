//matriz
var col = 27;
var row = 15;
var cuad = 32;
//creando elementos para array
var matriz = new Array(row);
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


var game = new Phaser.Game(col * cuad, row * cuad, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {

  game.load.image('background', 'static/sprites/tron.jpg');
  game.load.audio('sfx', 'static/Sounds/Daft.ogg');
  //game.load.spritesheet('BikeYellow','assets/BikesYellow.png',32,32)
  //Blue
  game.load.spritesheet('Blue', 'static/sprites/Blue.png',10,10);
  //Yellow
  game.load.spritesheet('yellow', 'static/sprites/Yellow.png', 10, 10);
  //ground
  game.load.image('Base', 'static/sprites/Base1.png');
  game.load.image('BaseMov', 'static/sprites/Block.png');

  //Boost
  game.load.image('BoostUp', 'static/sprites/Boost1.png');
  game.load.image('BoostSlow', 'static/sprites/boost3.png');
  game.load.image('DeleteStella', 'static/sprites/DeleteStella.png');
  //escore


}
//vars
var YellowBike;
var BlueBike;
var Yellow;
var Blue;
var cursors1;
var cursors2;
var Base;
var currentVelBlue;
var currentVelYellow;
var lifeBlue;
var lifeYellow;
var scoreText;//Bonus   
var BoostUp;
var BoostSlow;
var DeleteStella;
var GameStop;
//cronos
var BaseMovtime;
var BoostUptime;
var BoostSlowTime;
var DeleteStellaTime;
var takenBoostUp = false;
var takenBoostUpSlow = false;
//const
var vel = 150;
var jump = 10;
var velplus = 250;
var veldown = 60;
var InitialYellowBikeX = Math.floor(((col / 2) + 4) * 32);
var InitialYellowBikeY = Math.floor((row / 2) * 32);
var InitialBlueBikeX = Math.floor(((col / 2) - 4) * 32);
var InitialBlueBikeY = Math.floor((row / 2) * 32);
var BoostTime = 3000;
var music;
//FUNCTION CREATE
function create() {
  //background
  game.add.sprite(0, 0, 'background');

  //escore
  lifeBlue = 3;
  lifeYellow = 3;

   music= game.add.audio('sfx');
   music.play();
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //Yellow Bike
  YellowBike = game.add.sprite(InitialYellowBikeX, InitialBlueBikeY, 'yellow');
  game.physics.arcade.enable(YellowBike);
  YellowBike.body.collideWorldBounds = true;
  cursors1 = game.input.keyboard.createCursorKeys();

  //YellowEstella
  Yellow = game.add.group();
  Yellow.enableBody = true;

  //Blue Bike
  BlueBike = game.add.sprite(InitialBlueBikeX, InitialBlueBikeY, 'Blue');
  BlueBike.animations.add('blink', [0, 1], 10, true);

  //controls Blue
  cursors2 = {
    "left": game.input.keyboard.addKey(Phaser.Keyboard.A),
    "down": game.input.keyboard.addKey(Phaser.Keyboard.S),
    "up": game.input.keyboard.addKey(Phaser.Keyboard.W),
    "right": game.input.keyboard.addKey(Phaser.Keyboard.D),
  };

  game.physics.arcade.enable(BlueBike);
  BlueBike.body.collideWorldBounds = true;


  //BlueEstella
  Blue = game.add.group();
  Blue.enableBody = true;

  //BlockNoMobile
  Base = game.add.group();
  game.physics.arcade.enable(Base);
  Base.enableBody = true;
  createMatriz();
  createBlockNoMobile();



  //Initial vel
  currentVelBlue = vel;
  currentVelYellow = vel;

  Basemov = game.add.group();
  game.physics.arcade.enable(Basemov);
  Basemov.enableBody = true;

  BoostUp = game.add.group();
  game.physics.arcade.enable(BoostUp);
  BoostUp.enableBody = true;

  BoostSlow = game.add.group();
  game.physics.arcade.enable(BoostSlow);
  BoostSlow.enableBody = true;

  DeleteStella = game.add.group();
  game.physics.arcade.enable(DeleteStella);
  DeleteStella.enableBody = true;




  //threads Boost and Base mobile
  CreateBaseMov();
  CreateBoostUp();
  CreateBoostSlow();
  CreateDeleteEstella();
  scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '4px', fill: '#fff' });
  scoreText.text = "Blue = " + lifeBlue + " Yellow= " + lifeYellow;
}

//UPDATE
function update() {

  //Blue Bike Stellas
  game.physics.arcade.collide(BlueBike, Blue, crashBlue, null, this);
  game.physics.arcade.collide(BlueBike, Yellow, crashBlue, null, this);

  //Yellow bike Stellas
  game.physics.arcade.collide(YellowBike, Blue, crashYellow, null, this);
  game.physics.arcade.collide(YellowBike, Yellow, crashYellow, null, this);

  //colide vs Basemov
  game.physics.arcade.collide(YellowBike, Basemov, crashYellow, null, this);
  game.physics.arcade.collide(BlueBike, Basemov, crashBlue, null, this);

  //collide vs Block
  game.physics.arcade.collide(YellowBike, Base, crashYellow, null, this);
  game.physics.arcade.collide(BlueBike, Base, crashBlue, null, this);

  //BoostKillStella
  game.physics.arcade.overlap(BlueBike, DeleteStella, DeleteStellaYellow, null, this);
  game.physics.arcade.overlap(YellowBike, DeleteStella, DeleteStellaBlue, null, this);
  //BoostUp´
  game.physics.arcade.overlap(BlueBike, BoostUp, BoostUpBlue, null, this);
  game.physics.arcade.overlap(YellowBike, BoostUp, BoostUpYellow, null, this);
  //BoostDown
  game.physics.arcade.overlap(BlueBike, BoostSlow, BoostSlowBlue, null, this);
  game.physics.arcade.overlap(YellowBike, BoostSlow, BoostSlowYellow, null, this);

  //Stelas
  if (!GameStop) {
    StellaBlue();
    StellaYellow();
    //Controls
    ControlBlueBike();
    ControlYellowBike();
  }



}

function BoostUpYellow() {

  BoostUp.callAll('kill');
  BoostUptime += BoostTime;
  currentVelYellow = velplus;
  if (YellowBike.body.velocity.y > 0 && YellowBike.body.velocity.x == 0)
    YellowBike.body.velocity.y = velplus;
  else if (YellowBike.body.velocity.y < 0 && YellowBike.body.velocity.x == 0)
    YellowBike.body.velocity.y = -velplus;
  else if (YellowBike.body.velocity.y == 0 && YellowBike.body.velocity.x > 0)
    YellowBike.body.velocity.x = velplus;
  else YellowBike.body.velocity.x = -velplus;

  setTimeout(function () {
    currentVelYellow = vel;
  }, BoostTime);

}
function BoostUpBlue() {

  BoostUp.callAll('kill');
  BoostUptime += BoostTime;
  currentVelBlue = velplus;
  if (BlueBike.body.velocity.y > 0 && BlueBike.body.velocity.x == 0)
    BlueBike.body.velocity.y = velplus;
  else if (BlueBike.body.velocity.y < 0 && BlueBike.body.velocity.x == 0)
    BlueBike.body.velocity.y = -velplus;
  else if (BlueBike.body.velocity.y == 0 && BlueBike.body.velocity.x > 0)
    BlueBike.body.velocity.x = velplus;
  else BlueBike.body.velocity.x = -velplus;

  setTimeout(function () {
    currentVelBlue = vel;
  }, BoostTime);

}
function BoostSlowYellow() {

  BoostSlow.callAll('kill');
  BoostUptime += BoostTime;
  currentVelYellow = veldown;
  if (YellowBike.body.velocity.y > 0 && YellowBike.body.velocity.x == 0)
    YellowBike.body.velocity.y = veldown;
  else if (YellowBike.body.velocity.y < 0 && YellowBike.body.velocity.x == 0)
    YellowBike.body.velocity.y = -veldown;
  else if (YellowBike.body.velocity.y == 0 && YellowBike.body.velocity.x > 0)
    YellowBike.body.velocity.x = veldown;
  else YellowBike.body.velocity.x = -veldown;

  setTimeout(function () {
    currentVelYellow = vel;
  }, BoostTime);

}
function BoostSlowBlue() {

  BoostSlow.callAll('kill');
  BoostUptime += BoostTime;
  currentVelBlue = veldown;
  if (BlueBike.body.velocity.y > 0 && BlueBike.body.velocity.x == 0)
    BlueBike.body.velocity.y = veldown;
  else if (BlueBike.body.velocity.y < 0 && BlueBike.body.velocity.x == 0)
    BlueBike.body.velocity.y = -veldown;
  else if (BlueBike.body.velocity.y == 0 && BlueBike.body.velocity.x > 0)
    BlueBike.body.velocity.x = veldown;
  else BlueBike.body.velocity.x = -veldown;

  setTimeout(function () {
    currentVelBlue = vel;
  }, BoostTime);

}


function DeleteStellaYellow() {
  DeleteStella.callAll('kill');
  KillYellow();
}
function DeleteStellaBlue() {
  DeleteStella.callAll('kill');
  KillBlue();
}
// Stellas

function KillBlue() {
  Blue.callAll('kill');
  console.log("Deleting Blue");
}
function KillYellow() {
  Yellow.callAll('kill');
  console.log("Deleting Yellow");
}
function StellaBlue() {
  if (BlueBike.body.velocity.y != 0 || BlueBike.body.velocity.x != 0)
    Blue.create(BlueBike.position.x, BlueBike.position.y, 'Blue');
}
function StellaYellow() {
  if (YellowBike.body.velocity.y != 0 || YellowBike.body.velocity.x != 0)
    Yellow.create(YellowBike.position.x, YellowBike.position.y, 'yellow');
}
function ControlYellowBike() {


  
  if (cursors1.down.isDown && YellowBike.body.velocity.y == 0) {
    YellowBike.body.velocity.y += jump;
    YellowBike.body.velocity.y = currentVelYellow;
    YellowBike.body.velocity.x = 0;

  }
  else if (cursors1.up.isDown && YellowBike.body.velocity.y == 0) {

    YellowBike.body.velocity.y -= jump;
    YellowBike.body.velocity.y = -currentVelYellow;
    YellowBike.body.velocity.x = 0;
  }
  else if (cursors1.left.isDown && YellowBike.body.velocity.x == 0) {
    YellowBike.body.velocity.x -= jump;
    YellowBike.body.velocity.y = 0;
    YellowBike.body.velocity.x = -currentVelYellow;

  }
  else if (cursors1.right.isDown && YellowBike.body.velocity.x == 0) {
    YellowBike.body.velocity.y += jump;
    YellowBike.body.velocity.y = 0;
    YellowBike.body.velocity.x = currentVelYellow;

  }


}

function ControlBlueBike() {
  BlueBike.animations.play('blink');
  if (cursors2.down.isDown && BlueBike.body.velocity.x != 0) {
    BlueBike.body.velocity.y = currentVelBlue;
    BlueBike.body.velocity.x = 0;
  }
  else if (cursors2.up.isDown && BlueBike.body.velocity.y == 0) {
    BlueBike.body.velocity.y = -currentVelBlue;
    BlueBike.body.velocity.x = 0;
  }
  else if (cursors2.left.isDown && BlueBike.body.velocity.x == 0) {
    BlueBike.body.velocity.y = 0;
    BlueBike.body.velocity.x = -currentVelBlue;
  }
  else if (cursors2.right.isDown && BlueBike.body.velocity.x == 0) {
    BlueBike.body.velocity.y = 0;
    BlueBike.body.velocity.x = currentVelBlue;
  }
}
function crashBlue(Bluebike, blue) {
  lifeBlue--;
  Restart();
}
function crashYellow(YellowBike, yellow) {
  lifeYellow--;
  Restart();
}

function cuadrante(x, y) {
  return matriz[x][y];
}

function createEmptyArray() {
  for (var i = 0; i < matriz.length; i++)
    for (var j = 0; j < matriz[i].length; j++)
      matriz[i][j] = 0;
}

function createMatriz() {
  var json = getCookie("map");
  if (json != "") {
    json = JSON.parse(getCookie("map"));
    for (var i = 0; i < row; i++)
      matriz[i] = json[i];
  }
  else
    for (var i = 0; i < matriz.length; i++) {
      matriz[i] = new Array(col);
      for (var j = 0; j < matriz[i].length; j++) {
        matriz[i][j] = 0;
      }
    }


}

function createBlockNoMobile() {
  var b;
  for (var i = 0; i < matriz.length; i++)
    for (var j = 0; j < matriz[i].length; j++)
      if (matriz[i][j] == 1) {
        b = Base.create(j * cuad, i * cuad, 'Base');
        b.body.immovable = true;
      }
}


function CreateBaseMov() {
  BaseMovtime = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
  var previousBaseMov = undefined;
  setInterval(function () {
    if (previousBaseMov != undefined)
      Basemov.remove(previousBaseMov);
    var x = Math.floor(Math.random() * col)
    var y = Math.floor(Math.random() * row);


    var basemov = Basemov.create(x * cuad, y * cuad, 'BaseMov');
    basemov.body.immovable = true;
    previousBaseMov = basemov;

  }, BaseMovtime);
}

function CreateBoostUp() {
  BoostUptime = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
  var previousBoostUp = undefined;
  if (!takenBoostUp)
    setInterval(function () {
      if (previousBoostUp != undefined)
        BoostUp.remove(previousBoostUp);
      var x = Math.floor(Math.random() * col)
      var y = Math.floor(Math.random() * row);

      var boostUp = BoostUp.create(x * cuad, y * cuad, 'BoostUp');
      boostUp.body.immovable = true;
      previousBoostUp = boostUp;
    }, BoostUptime);
}
function CreateBoostSlow() {

  BoostSlowTime = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
  var previousBoostSlow = undefined;
  setInterval(function () {
    if (previousBoostSlow != undefined)
      BoostSlow.remove(previousBoostSlow);

    var x = Math.floor(Math.random() * col)
    var y = Math.floor(Math.random() * row);

    var boostSlow = BoostSlow.create(x * cuad, y * cuad, 'BoostSlow');
    boostSlow.body.immovable = true;
    previousBoostSlow = boostSlow;


  }, BoostSlowTime);
}


function CreateDeleteEstella() {
  DeleteStellaTime = Math.floor(Math.random() * (15000 - 3000 + 1)) + 3000;
  var previousDeleteStella = undefined;
  setInterval(function () {
    if (previousDeleteStella != undefined)
      DeleteStella.remove(previousDeleteStella);

    var x = Math.floor(Math.random() * col)
    var y = Math.floor(Math.random() * row);

    var deleteStella = DeleteStella.create(x * cuad, y * cuad, 'DeleteStella');
    deleteStella.body.immovable = true;
    previousDeleteStella = deleteStella;


  }, DeleteStellaTime);

}

function mostrar(valor) {
  console.log(valor);
}


function Restart() {
  KillBlue();
  KillYellow();
  scoreText.text = "Blue = " + lifeBlue + " Yellow= " + lifeYellow;
  //BlueBike
  BlueBike.body.velocity.y = 0;
  BlueBike.body.velocity.x = 0;
  BlueBike.body.x = InitialBlueBikeX;
  BlueBike.body.y = InitialBlueBikeY;
  //YellowBike
  YellowBike.body.velocity.y = 0;
  YellowBike.body.velocity.x = 0;
  YellowBike.body.x = InitialYellowBikeX;
  YellowBike.body.y = InitialYellowBikeY;

  if (!lifeBlue || !lifeYellow) {
    GameStop = true;
    var ganador;
    if (lifeBlue)
      ganador = "Gano el jugador azul ¿reiniciar?";
    else ganador = "Gano el jugador amarillo ¿reiniciar?";

    var eleccion = confirm(ganador);

    if (eleccion)
      location.reload(this);
    else window.location = "app.html"


  }


}