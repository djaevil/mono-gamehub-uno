export class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.3);
    progressBox.fillRect(256, 384, 512, 30);

    var loadingText = this.add.text(512, 384 - 35, "Loading..", {
      fontFamily: "monospace",
      fontSize: 44,
      color: "#b42020ff",
    });
    loadingText.setOrigin(0.5);

    this.load.on("progress", function (progress) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(256, 384, 512 * progress, 30);
    });

    this.load.setPath("/assets/number-cards/");
    for (let i = 0; i <= 9; i++) {
      this.load.image(`card-${i}`, `_${i}.png`);
    }

    this.load.setPath("/assets/special-cards/");
    this.load.image("card-block", "_block.png");
    this.load.image("card-reverse", "_reverse.png");
    this.load.image("card-draw-two", "_draw2.png");
    this.load.image("card-wild", "_wild.png");
    this.load.image("card-wild-draw-four", "_wild_draw4.png");

    this.load.setPath("/assets/card-colors/");
    this.load.image("color-red", "red_base.png");
    this.load.image("color-yellow", "yellow_base.png");
    this.load.image("color-green", "green_base.png");
    this.load.image("color-blue", "blue_base.png");

    this.load.setPath("/assets/utility/");
    this.load.image("card-back", "_back.png");
    this.load.image("card-deck", "_deck.png");

    this.load.on("complete", function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });

    // // fake loading bar - ENABLE IN PROD
    // this.load.image("loadimage", "loadimg.png");
    // for (var i = 0; i < 2250; i++) {
    //   this.load.image("loadimage" + i, "loadimg.png");
    // }
  }

  create() {
    var dLogo = this.add.image(512, 384, "djaevil-logo").setScale(0.75);
    this.tweens.add({
      targets: dLogo,
      alpha: 1,
      duration: 500, // 2500 - CHANGE IN PROD
      onComplete: () => {
        dLogo.destroy();
        this.scene.transition({
          target: "MainMenu",
          duration: 300,
          moveBelow: true,
        });
      },
    });
  }
}
