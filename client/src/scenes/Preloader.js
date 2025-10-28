export class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 215, height / 2 - 25, 450, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    this.load.on("progress", function (progress) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(
        width / 2 - 215,
        height / 2 - 25,
        430 * progress,
        30
      );
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

    this.load.image("loadimage", "loadimg.png");
    for (var i = 0; i < 2250; i++) {
      this.load.image("loadimage" + i, "loadimg.png");
    }
  }

  create() {
    var dLogo = this.add.image(450, 250, "djaevil-logo").setScale(0.3);
    this.tweens.add({
      targets: dLogo,
      alpha: 1,
      duration: 2500,
      onComplete: () => {
        dLogo.destroy();
        this.scene.transition({
          target: "MainMenu",
          duration: 300,
          moveBelow: true,
          onComplete: () => {
            this.cameras.main.setAlpha(0);
          },
        });
      },
    });
  }
}
