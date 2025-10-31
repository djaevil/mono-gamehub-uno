export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }
  create() {
    this.add.image(512, 384, "background").setDisplaySize(1024, 768);
    this.add.image(512, 154, "logo").setOrigin(0.5).setScale(0.75);

    const joinBtn = this.add
      .text(512, 384, "Join Game", {
        fontFamily: "monospace",
        fontSize: "28px",
        color: "#000000ff",
        backgroundColor: "#ffffffff",
        padding: { x: 75, y: 20 },
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () =>
        joinBtn.setStyle({ backgroundColor: "#dfdfdfff" })
      )
      .on("pointerout", () =>
        joinBtn.setStyle({ backgroundColor: "#ffffffff" })
      )
      .on("pointerdown", () => {
        this.scene.start("JoinScene");
      });

    const hostBtn = this.add
      .text(512, 484, "Host Game", {
        fontFamily: "monospace",
        fontSize: "28px",
        color: "#000000ff",
        backgroundColor: "#ffffffff",
        padding: { x: 75, y: 20 },
        align: "center",
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () =>
        hostBtn.setStyle({ backgroundColor: "#dfdfdfff" })
      )
      .on("pointerout", () =>
        hostBtn.setStyle({ backgroundColor: "#ffffffff" })
      )
      .on("pointerdown", () => {
        this.scene.start("HostScene");
      });

    this.add
      .text(1024, 768, "Created by djaevil - 2025")
      .setOrigin(1)
      .setStyle({
        fontFamily: "monospace",
        fontSize: "12px",
      });
  }
}
