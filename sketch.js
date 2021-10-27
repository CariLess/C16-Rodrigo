//crear variables Trex
var trex, trex_running;
//crear variables suelo
var ground, groundImage;

var invisibleGround;

var salto;

var cloud, cloudImage;

var obstacles, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var rand;

var score;

var obstaclesGroup, cloudsGroup;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var trex_collided;

var restart;

var gameover;

var restartimage;

var gameoverimage;

var jumpSound, checkPointSound, dieSound;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  //subir imagen del suelo
  groundImage = loadImage("ground2.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");

  obstacle2 = loadImage("obstacle2.png");

  obstacle3 = loadImage("obstacle3.png");

  obstacle4 = loadImage("obstacle4.png");

  obstacle5 = loadImage("obstacle5.png");

  obstacle6 = loadImage("obstacle6.png");

  trex_collided = loadAnimation("trex_collided.png");

  restartimage = loadImage("restart.png");

  gameoverimage = loadImage("gameOver.png");

  jumpSound = loadSound("jump.mp3");
 
}

function setup() {
  //espacio del juego
  createCanvas(600, 200);

  //Crear el Sprite del Trex
  trex = createSprite(50, 160, 20, 50);
  trex.scale = 0.5;
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);

  //crear el sprite del suelo
  ground = createSprite(300, 180, 600, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  //crear un sprite de suelo invisible
  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  //var rand =Math.round(random(1,100));
  //console.log(rand);
  obstaclesGroup = new Group();
  cloudsGroup = new Group();

  score = 0;

  trex.setCollider("circle",0,0,40); trex.debug = true;
  
  restart = createSprite(300,100);
  restart.addImage(restartimage);

  gameover = createSprite(300,80);
  gameover.addImage(gameoverimage);
  gameover.scale = 0.5;
  restart.scale = 0.4;

  gameover.visible = false;
  restart.visible = false;
}

function draw() {
  background("white");

  salto = 0;

  text("score:" + score, 500, 50);


  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / (60));
    //agregar el movimiento
    ground.velocityX = -2;

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    //Salto
    if (trex.y < 160) salto = 1;
    if (trex.y > 160) salto = 0;

    if (keyDown("space") && (salto === 0)) {
      trex.velocityY = -10;
      jumpSound.play();
    }

    //le damos una velocidad de bajada "gravedad"
    trex.velocityY = trex.velocityY + 0.5;

    spawnClouds();

    spawnObstacles();


    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
    }

  } else if (gameState === END) {
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    gameover.visible = true;
    restart.visible = true;
  }


  //evita que el trex se caiga
  trex.collide(invisibleGround);


  //console.log(frameCount);

  drawSprites();

}

function spawnClouds() {
  //escribir el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(10, 100));
    cloud.velocityX = -3;

    //console.log(trex.depth, cloud.depth);

    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    //asignar un tiempo de vida a las nubes
    //lifetime = Distancia / velocidad
    cloud.lifetime = 200;

    cloudsGroup.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {

    obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -3;

    rand = Math.round(random(1, 6));

    switch (rand) {
      case 1: obstacle.addImage(obstacle1);
        break;

      case 2: obstacle.addImage(obstacle2);
        break;

      case 3: obstacle.addImage(obstacle3);
        break;

      case 4: obstacle.addImage(obstacle4);
        break;

      case 5: obstacle.addImage(obstacle5);
        break;

      case 6: obstacle.addImage(obstacle6);
        break;

      default:
        break;

    }

    obstacle.scale = 0.7;
    obstacle.lifetime = 208;

    obstaclesGroup.add(obstacle);

  }
}

