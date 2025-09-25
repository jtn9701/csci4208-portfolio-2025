class PowerUp extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, config) {
        super(scene, config.x, config.y, config.type );
        this.depth = 1;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.velocity.x = -300;
    }

    // This is the key: a placeholder method for subclasses to override.
    applyEffect(player) {
        console.warn('applyEffect not implemented for this power-up type.');
    }
}
