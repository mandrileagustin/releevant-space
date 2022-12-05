function preload() {
  this.load.image("sky", "assets/backgrounds/blue.png");
  this.load.image("player", "assets/characters/player.png");
}

function create() {
  this.add.image(400, 300, "sky");

  const player = this.add.image(400, 300, "player");
  player.setScale(0.2);
}
