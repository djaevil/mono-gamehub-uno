export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }
  create() {
    this.add.image(450, 250, "background");
    this.add.image(450, 100, "logo").setScale(0.5);
  }
}
