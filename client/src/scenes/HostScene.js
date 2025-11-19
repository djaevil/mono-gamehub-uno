import { createUIButton } from "../helpers/components.js";
export class HostScene extends Phaser.Scene {
  constructor() {
    super("HostScene");
  }
  create() {
    this.add.image(512, 384, "background").setDisplaySize(1024, 768);

    const basePanel = this.rexUI.add
      .roundRectangle(512, 424, 400, 350, 10, 0xffffffff)
      .setStrokeStyle(2, 0x000000);

    const title = this.add
      .text(512, 175, "Host Game", {
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

    const pNameTitle = this.add
      .text(512, 295, "Enter player name", {
        fontFamily: "monospace",
        fontSize: "22px",
        color: "#000000ff",
        padding: { x: 85, y: 10 },
        align: "center",
      })
      .setOrigin(0.5);

    const pName = this.add
      .text(512, 334, "...", {
        fontFamily: "monospace",
        fontSize: "22px",
        color: "#000000ff",
        backgroundColor: "#a5a5a5ff",
        fixedWidth: 350,
        padding: { x: 0, y: 10 },
        align: "center",
      })
      .setOrigin(0.5);

    pName.setInteractive({ useHandCursor: true }).on("pointerdown", () => {
      this.rexUI.edit(pName, {
        onTextChanged: (textObject, text) => {
          if (text.length > 15) {
            text = text.substring(0, 15);
          }
          textObject.text = text;
        },
      });
    });

    this.add
      .text(512, 370, "Max. 15 characters!", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#000000ff",
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(
        512,
        455,
        "Upon typing a name and clicking continue, a lobby will be created in which others can join through a lobby code",
        {
          fontFamily: "monospace",
          fontSize: "14px",
          color: "#000000ff",
          backgroundColor: "#d1d1d1ff",
          wordWrap: { width: 330 },
          align: "center",
          padding: { x: 10, y: 10 },
        }
      )
      .setOrigin(0.5, 0.5);

    const backBtn = createUIButton(this, "Back", 0xcc3333, () => {
      this.scene.start("MainMenu");
    });

    const continueBtn = createUIButton(this, "Continue", 0x28a745, () => {
      console.log("CONTINUE");
    });

    const buttonGroup = this.rexUI.add
      .buttons({
        x: 512,
        y: 550,
        orientation: "horizontal",
        buttons: [backBtn, continueBtn],
        space: { item: 125 },
      })
      .setOrigin(0.5)
      .layout();

    buttonGroup.on("button.click", (button, index, pointer, event) => {
      if (index === 0) {
        this.scene.start("MainMenu");
      } else if (index === 1) {
        this.scene.start("LobbyScene");
      }
    });
  }
}
