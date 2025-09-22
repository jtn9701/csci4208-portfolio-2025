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
        this.create_collisions();
    }
    
    //Update game data
    update() {
        this.update_player();
        this.update_background();
    }

    //load level
    create_map() {
        this.background = this.add.tileSprite(640/2, 480/2, 640, 480, 'background');
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
        config.x = 640 + 32;
        position.x = Phaser.Math.Between(0, 640);
        position.y = Phaser.Math.Between(0, 480);

        const monster = new Enemy(this, position);
        this.enemies.push(monster);
    }

    //sets up overlap collisions behaviors
    create_collisions() {
        this.physics.add.overlap(this.player,this.enemies,this.game_over,null,this);
    }

    game_over() {
        this.cameras.main.flash();
        this.scene.restart();
    }

    update_background(){
        this.background.tilePositionX += 3;
    }

}