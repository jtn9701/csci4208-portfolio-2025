const config = new Object();

config.type = Phaser.CANVAS; //HTML Rendering API
config.width = 32 * 96; //32px/tile * 96 tiles/world
config.height = 32 * 16; //32px/tile * 16 tiles/world
config.pixelArt = true; //optimized for pixel art
config.scene = [ Level1 ]; //Scenes in this game
config.physics = { default:'arcade'}; //Physics: collisions & gravity

const game = new Phaser.Game(config); //Start game with these configs