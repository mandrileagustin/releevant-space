function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
}

function create() {
  // scene background
  this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, "sky");

  // playet setup
  const player = this.add.image(SCREEN_WIDTH / 2, SCREEN_HEIGHT, "player");
  player.setX((SCREEN_WIDTH - player.width * PLAYER_SCALE) / 2);
  player.setY(SCREEN_HEIGHT - player.height * PLAYER_SCALE);
  player.setScale(PLAYER_SCALE);
}
