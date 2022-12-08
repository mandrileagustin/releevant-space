/**
 * Variables used during the game.
 */
 let player;
 let enemy = [];
 let cursors;
 let background1;
 let background2;
 let spaceBar;
 let bullet=[];
 let contBullet=0;
 let frame=-1;
 let score = 0;
 let scoreText;
 let explosion;
 let propulsion;
 let disparo;
 let pause = false;
 
 /**
  * It prelaods all the assets required in the game.
  */
 function preload() {
   this.load.image("sky", "assets/backgrounds/blue.png");
   this.load.image("player", "assets/characters/player.png");
   this.load.image("enemy", "assets/characters/alien2.png");
   this.load.image("red","assets/backgrounds/red.png")
   this.load.image("propulsion","assets/characters/propulsion.png")
   this.load.audio("fondo","assets/sounds/fondo.mp3");
   this.load.audio("disparo","assets/sounds/disparo.mp3")
   this.load.image("gameOver","assets/backgrounds/gameOver.png")
 }
 
 /**
  * It creates the scene and place the game objects.
  */
 function create() {
   // scene background
   background1 = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");
   background2 = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2-background1.height, "sky");

   /////sonido

  //  let sonidoFondo = this.sound.add("fondo");
  //  sonidoFondo.loop = true;
  //  sonidoFondo.play();

   disparo = this.sound.add("disparo");
   
 
   // playet setup
   player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
   player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
   player.setY(SCREEN_HEIGHT - (player.height * PLAYER_SCALE) / 2);
   player.setScale(PLAYER_SCALE);
 
   // enemy setup
   enemy = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "enemy");
   enemy.setX((SCREEN_WIDTH - enemy.width * ENEMY_SCALE) / 2);
   enemy.setY((enemy.height * ENEMY_SCALE) / 2);
   enemy.setScale(ENEMY_SCALE);

   /// Game Over
   gameOver = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "gameOver");
   gameOver.setX(SCREEN_WIDTH + gameOver.width);
   gameOver.setY(SCREEN_HEIGHT + gameOver.height);
 
   //cursors map into game engine
   cursors = this.input.keyboard.createCursorKeys();
   
   //map space key status
   spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

   scoreText = this.add.text(5, 5, "Score: 0", {
    font: "12px Arial",
    fill: "#0095DD",
 
  });

  // start = this.add.text( "START",{
  //   font: "40px Arial",
  //   fill: "#0095DD",
  // })

  explosion = this.add.particles("red").createEmitter({
    sclale: {min: 0.5, max:0},
    speed: {min:-100, max: 100},
    quantity: 5,
    frequency: 0.1,
    lifespan: 200,
    gravityY: 0,
    on: false,
  })

  propulsion = this.add.particles("propulsion").createEmitter({
    sclale: {min: 0.5, max:0},
    speed: {min:-100, max: 100},
    quantity: 6,
    frequency: 0.1,
    lifespan: 50,
    gravityY: 0,
    on: false,
  })
 }
 
 /**
  * Updates each game object of the scene.
  */
 function update()  {
  if(pause) {
    return;
  }
   this.add.ellipse(player.x,player.y-player.height/2*PLAYER_SCALE,180,200)
   moverPlayer();
   moverFondo();
   if(frame < 0){
     disparar(this);
   }
   if (contBullet > 0){
   moverBala();
   }
   frame--;
   moverEnemy();
   console.log(bullet.length);
}
///// movimiento player
 function moverPlayer() {
   if (cursors.left.isDown) {
     let xPlayer = player.x-PLAYER_VELOCITY;
     if (xPlayer<(player.width/2)*PLAYER_SCALE){
       xPlayer=(player.width/2)*PLAYER_SCALE;
     }
     player.setX(xPlayer);
   }
   else if(cursors.right.isDown){
     let xPlayer = player.x+PLAYER_VELOCITY;
     if (xPlayer>SCREEN_WIDTH-(player.width/2)*PLAYER_SCALE){
       xPlayer=SCREEN_WIDTH-(player.width/2)*PLAYER_SCALE;
     }
     player.setX(xPlayer);
   }
   if(cursors.up.isDown){
     let yPlayer = player.y-PLAYER_VELOCITY;
     if (yPlayer<(player.height/2)*PLAYER_SCALE){
       yPlayer=(player.height/2)*PLAYER_SCALE;
     }
     player.setY(yPlayer);
   }
   else if(cursors.down.isDown){
     let yPlayer = player.y+PLAYER_VELOCITY;
     if (yPlayer>SCREEN_HEIGHT-(player.height/2)*PLAYER_SCALE){
       yPlayer=SCREEN_HEIGHT-(player.height/2)*PLAYER_SCALE;
     }
     player.setY(yPlayer);
   }
   propulsion.setPosition(player.x , player.y +40);
      propulsion.explode();
 }
/// movimiento enemigo
 function moverEnemy()  {
  enemy.setY(enemy.y + ENEMY_VELOCITY);
  if (
    player.x >= enemy.x - (enemy.width * ENEMY_SCALE) / 2 &&
    player.x <= enemy.x + (enemy.width * ENEMY_SCALE) / 2 &&
    player.y >= enemy.y - (enemy.height * ENEMY_SCALE) / 2 &&
    player.y <= enemy.y + (enemy.height * ENEMY_SCALE) / 2 ||
    enemy.y >= SCREEN_HEIGHT
  ){

    gameOver.setX(SCREEN_WIDTH /2)
    gameOver.setY(SCREEN_HEIGHT /2)
    enemy.destroy()
    player.destroy();
    explosion.setPosition(enemy.x, enemy.y);
    explosion.explode();
    pause = true;

  }
  
 }
/// movimiento fondo
 function moverFondo()  {
   background1.setY(background1.y+BACKGROUND_VELOCITY);
   background2.setY(background2.y+BACKGROUND_VELOCITY);
     
     if (background1.y>background1.height+SCREEN_HEIGHT/2){
       background1.setY(background2.y-background1.height)
       let temp = background1;
       background1 = background2;
       background2 = temp;
     }
   }
///// disparos 
   function disparar(engine)  {
     if(spaceBar.isDown){
      disparo.play()
       bullet.push
       (engine.add.ellipse
        (player.x,player.y-player.height/2*PLAYER_SCALE, 5, 15, 0x6666ff))
       contBullet++;
       frame = 20;
     }
   }
//// movimiento bala 
   function moverBala() {
    let index =-1;
     for (let i = 0; i < bullet.length ; i++){
       bullet[i].setY(bullet[i].y-BULLET_VELOCITY)
       if( bullet[i].y <0 - bullet[i].height) {
        bullet[i].destroy();
        index = i;
       }
       colision(bullet[i]);
     }
     if(index >=0 ){
      bullet.splice(index,1)
     }
  }
//// colision de objetos
  function colision(bala) {
    if ((bala.x>=enemy.x-(enemy.width*ENEMY_SCALE)/2 && bala.x<=enemy.x+(enemy.width*ENEMY_SCALE)/2)&&
    (bala.y>=enemy.y-(enemy.height*ENEMY_SCALE)/2 && bala.y<=enemy.y+(enemy.height*ENEMY_SCALE)/2)){
      
      collectEnemy(bala, enemy)
      explosion.setPosition(enemy.x, enemy.y);
      explosion.explode();
      enemy.setY((enemy.height * ENEMY_SCALE)/2); 
      enemy.setX(Math.floor(Math.random()*(SCREEN_WIDTH-enemy.width) + (enemy.width/2)));
      bala.destroy();
    }
  }
/////Score
  function collectEnemy() {
    score += 1;
    scoreText.setText("Score:"+score)
  }
