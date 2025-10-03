class Level1 extends Phaser.Scene {
    //construct new scene
    constructor(key='Level1') {
        super(key); //set this scene's id within superclass constructor
        this.map_key = 'map1';
        this.map_json = 'level1.json';
    }

    //preload external game assets
    preload() { 
        this.load.path = 'assets/'; //Define file path
        this.load.tilemapTiledJSON( this.map_key, this.map_json); //Load JSON file
        const tile_size = {frameWidth: 32, frameHeight: 32}
        this.load.spritesheet('tiles', 'tiles.png', tile_size); //Load tile spritesheet
        this.load.image( 'player', 'player.png'); //load player image
    }

    //create game data
    create() {
        this.create_map(); // create level
        this.create_player(); //helper method: create player
        this.create_gravity(); // create gravity
        this.create_camera(); // create camera
    }
    
    //Update game data
    update() {
        this.update_player();
    }

    //Load level
    create_map() {
        this.map = this.make.tilemap({ key: this.map_key }); //setup map object from tilemap

        // Argments: 1: Tiled tileset name, 2: image key you loaded
        const groundTiles = this.map.addTilesetImage('tiles', 'tiles');

        // Arguments: 1:<Tiled layer name or index>, 2:Tileset, 3:<x offset px>, 4:<y offset px>
        this.groundLayer = this.map.createLayer('tiles', groundTiles, 0, 0);
    }

    //Create Game World
    create_player() {
        this.player = new Player(this); //create player
    }

    //update game state
    update_player() {
        this.player.move();
    }

    //setup gravity with physics
        create_gravity() {
        this.physics.world.gravity.y = 600;
    }

    //Setup camera to follow player
    create_camera() {
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setBackgroundColor('rgb(204, 207, 255)');
    }

}
