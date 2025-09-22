class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, position) {
        super(scene, position.x, position.y, 'enemy');
        this.depth = 2;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.velocity.x = -Phaser.Math.Between(120, 300);
    }
}