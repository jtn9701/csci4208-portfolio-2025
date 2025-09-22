class PlayScene extends Phaser.Scene {
    //construct new scene
    constructor() {
        super('play'); //set this scene's id within superclass constructor
    }

    //preload external game assets
    preload() {
        this.load.path = 'assets/'; //Define file path
        this.load.image( 'background', 'background.png' );  //Load tile images
        this.load.image( 'player', 'player.png' ); //Load player image
        this.load.image( 'enemy', 'enemy.png' ); //Load enemy image
    }

    //create game data
    create() {
        this.create_map();  // create level
        this.create_player();
        this.create_enemies();
    }
    
    //Update game data
    update() {
        this.update_player();
    }

    //load level
    create_map() {
        this.add.image(640/2, 480/2, 'background');
    }

    //create player
    create_player() {
        this.player = new Player(this);
    }

    //update game state
    update_player() {
        this.player.move();
    }

    create_enemies() {
        this.enemies = [];
        const event = new Object();
        event.delay = 200;
        event.callback = this.spawn_enemy;
        event.callbackScope = this;
        event.loop = true;
        this.time.addEvent(event, this);
    }

    spawn_enemy() {
        const position = {};
        position.x = Phaser.Math.Between(0, 640);
        position.y = Phaser.Math.Between(0, 480);
        
        const monster = new Enemy(this, position);
        this.enemies.push(monster);
    }
}