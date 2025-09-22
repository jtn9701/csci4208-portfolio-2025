class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene, 300, 200, 'player');
        this.depth = 2;
        this.speed = 200;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true); //don't go out of the map
        this.body.setSize(this.width-16, this.height-16); // 16x16 for 32x32

        this.buttons = scene.input.keyboard.addKeys('up,down,left,right');
    }

    //move player
    move() {
        // reset velocity
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;

        // take care of character movement
        if ( this.buttons.up.isDown ) {
            this.body.velocity.y = -this.speed;
        }
        if ( this.buttons.down.isDown ) {
            this.body.velocity.y = this.speed;
        }
        if ( this.buttons.left.isDown ) {
            this.body.velocity.x = -this.speed;
        }
        if ( this.buttons.right.isDown ) {
            this.body.velocity.x = this.speed;
        }
    }

}