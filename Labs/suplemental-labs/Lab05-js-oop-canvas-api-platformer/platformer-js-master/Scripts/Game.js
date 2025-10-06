class Game {
  /* Properties */
  #isOver;
  #world;
  #level;
  #scene;
  #controller;

  /* Create a new Platform Game */
  constructor() {
    this.#isOver = false;
    this.#world = new World();
    this.#level = 0;
    const levelData = this.#world.getLevel(this.#level);
    this.#scene = new Scene(levelData);
    const player = this.#scene.getPlayer();
    this.#controller = new Controller(player);
  }

  update() {
    this.#controller.update();
    this.#scene.update();
    if (this.#scene.getExit().isTouching(this.#scene.getPlayer())) {
      this.#level++;
      if (this.#level < this.#world.getLength()) {
        this.loadScene();
      } else {
        this.#isOver = true;
      }
    }
    if (this.#scene.hasCollisions()) {
      this.loadScene();
    }
  }

  render() {
    this.#scene.draw();
  }

  /* The main game loop (static method) */
  static main() {
    if (game.#isOver === false) {
      game.update();
      game.render();
      window.requestAnimationFrame(Game.main);
    } else {
    }
  }

  loadScene() {
    const map = this.#world.getLevel(this.#level);
    this.#scene = new Scene(map);
    this.#controller = new Controller(this.#scene.getPlayer());
  }
}
const game = new Game();
