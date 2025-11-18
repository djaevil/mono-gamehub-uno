import { createPlayerPanel, createUIButton } from "../helpers/components";

export class LobbyScene extends Phaser.Scene {
  constructor() {
    super("LobbyScene");
  }
  create() {
    this.add.image(512, 384, "background").setDisplaySize(1024, 768);

    const title = this.add
      .text(512, 125, "Game Lobby", {
        fontFamily: "monospace",
        fontSize: "52px",
        color: "#ffffffff",
        stroke: "#000000",
        strokeThickness: 1,
        shadow: {
          offsetX: 0,
          offsetY: 2,
          color: "#000",
          blur: 0,
          stroke: true,
          fill: false,
        },
      })
      .setOrigin(0.5);

    const status = this.add
      .text(512, 165, "Waiting for players...", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#ffffffff",
      })
      .setOrigin(0.5);

    var lobbyCode = 101010;

    const lobbyCodeContainer = this.rexUI.add.label({
      background: this.rexUI.add.roundRectangle(
        512,
        235,
        125,
        75,
        10,
        0xffffffff
      ),
      text: this.add
        .text(512, 220, "Lobby code:", {
          fontSize: "18px",
          fontFamily: "monospace",
          color: "#000000ff",
        })
        .setOrigin(0.5),
    });

    this.add
      .text(512, 245, lobbyCode, {
        fontSize: "22px",
        fontFamily: "monospace",
        color: "#000000ff",
      })
      .setOrigin(0.5);

    const playerPanel1 = createPlayerPanel(this, 336, 360);
    const playerPanel2 = createPlayerPanel(this, 688, 360);
    const playerPanel3 = createPlayerPanel(this, 336, 520);
    const playerPanel4 = createPlayerPanel(this, 688, 520);

    const exitBtn = createUIButton(this, "Exit", 0xcc3333);
    const startBtn = createUIButton(this, "Start", 0x28a745);

    const buttonGroup = this.rexUI.add
      .buttons({
        x: 512,
        y: 650,
        orientation: "horizontal",
        buttons: [exitBtn, startBtn],
        space: { item: 200 },
      })
      .setOrigin(0.5)
      .layout();

    buttonGroup.on("button.click", (button, index, pointer, event) => {
      if (index === 0) {
        this.scene.start("MainMenu");
      } else if (index === 1) {
        console.log("START!");
      }
    });
  }
}
