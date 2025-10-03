class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 0, 0, 'player');

        const start = scene.map.findObject('items', obj => obj.name === 'player' );
        this.x = start.x;
        this.y = start.y ;
        this.setOrigin(0.5,1);
        this.depth = 1;
        this.speed = 200;
        
        scene.add.existing(this);
    }
}