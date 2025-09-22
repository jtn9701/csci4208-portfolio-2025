class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, position) {
        super(scene, position.x, position.y, 'enemy');
        this.depth = 2;
        
        scene.add.existing(this);
    }
}