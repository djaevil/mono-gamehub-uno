export class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.setPath("/assets/");

    this.load.image("background", "background.png");
    this.load.image("logo", "logo.png");
    this.load.image("djaevil-logo", "djaevil-logo4.png");
  }

  create() {
    this.scene.start("Preloader");
  }
}
