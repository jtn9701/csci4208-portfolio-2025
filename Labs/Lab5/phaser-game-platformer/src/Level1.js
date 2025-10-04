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
        this.load.spritesheet('items', 'items.png', tile_size); //Load items spritesheet
        this.load.image( 'player', 'player.png'); //load player image
    }

    //create game data
    create() {
        this.create_map(); // create level
        this.create_player(); //helper method: create player
        this.create_collectables(); // create collectables
        this.create_hazards(); // create hazards
        this.create_falling_tiles(); // create falling tile hazards
        this.create_goal(); // create goal
        this.create_gravity(); // create gravity
        this.create_camera(); // create camera
        this.create_colisions(); // create collisions
    }
    
    //Update game data
    update() {
        this.update_player();
        this.game_over();
    }

    //Load level
    create_map() {
        this.map = this.make.tilemap({ key: this.map_key }); //setup map object from tilemap

        // Argments: 1: Tiled tileset name, 2: image key you loaded
        const groundTiles = this.map.addTilesetImage('tiles', 'tiles');

        // Arguments: 1:<Tiled layer name or index>, 2:Tileset, 3:<x offset px>, 4:<y offset px>
        this.groundLayer = this.map.createLayer('tiles', groundTiles, 0, 0);

        //collisions based on tile type in custom properties
        const ground_block = { terrain: 'block'};
        this.groundLayer.setCollisionByProperty( ground_block );
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

    //setups collisions with physics
    create_colisions(){
        this.physics.add.collider( this.player, this.groundLayer );
        this.physics.add.overlap(this.player,this.goal,this.next_scene,null,this);
        this.physics.add.overlap(this.player,this.group_hazard1,this.game_over,null,this);
        this.physics.add.overlap(this.player,this.group_hazard2,this.game_over,null,this);
        this.physics.add.collider(this.player,this.group_fall,this.add_gravity,null,this);
        this.physics.add.overlap( this.player, this.group_collect, this.take_collectable, null, this );
    }

    //check player lose conditions
    game_over(player=null, hazard=null){
        if (this.player.y > this.map.heightInPixels) { //check if player is lower than level
            this.scene.restart();
        }
        if (hazard !== null) { //check if player is touching hazard
            this.scene.restart();
        }
    }

    setup_objects(objGroup){
        for(let obj of objGroup) {
            this.physics.add.existing(obj);
            obj.body.immovable = true;
            obj.body.allowGravity = false;
        }
    }

    //Create items from object layer
    create_goal(){
        const goal_image = { name: 'goal', key: 'items', frame: 3 };
        this.goal = this.map.createFromObjects('items', goal_image);
        this.setup_objects(this.goal);
    }

    //start the next level
    next_scene(player,goal) {
        this.scene.start('Level2');
    }

    //Create hazard items from object layer
    create_hazards(){
        const hazard1_image = { name: 'hazard1', key: 'items', frame: 2 };
        this.group_hazard1 = this.map.createFromObjects('items', hazard1_image);
        this.setup_objects(this.group_hazard1);

        const hazard2_image = { name: 'hazard2', key: 'items', frame: 1 };
        this.group_hazard2 = this.map.createFromObjects('items', hazard2_image);
        this.setup_objects(this.group_hazard2);
    }

    //Create falling tile items from object layer
    create_falling_tiles() {
        const fall_image = {name:'fall', key:'tiles', frame: 3 };
        this.group_fall = this.map.createFromObjects( 'items', fall_image);
        this.setup_objects(this.group_fall);
    }

    //check player lose conditions
    add_gravity(player, hazard){
        hazard.body.gravity.y = -1;
        hazard.body.allowGravity = true;
    }

    //Create items from object layer
    create_collectables(){
        const collect_data = { name: 'collect', key: 'items', frame: 0 };
        this.group_collect = this.map.createFromObjects('items', collect_data);
        this.setup_objects(this.group_collect);
    }

    //pick up coins - scoring logic would go in this method too
    take_collectable( player, collect ) {
        collect.destroy();
    }

}
