export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }
  create() {
    this.add.image(512, 384, "background").setScale(2);
  }
}
