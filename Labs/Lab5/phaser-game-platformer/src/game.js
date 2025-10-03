const config = new Object();

config.type = Phaser.CANVAS; //HTML Rendering API
config.scene = [ Level1 ]; //Scenes in this game

const game = new Phaser.Game(config); //Start game with these configs