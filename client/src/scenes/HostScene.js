export class HostScene extends Phaser.Scene {
  constructor() {
    super("HostScene");
  }
  create() {
    this.add.image(512, 384, "background").setDisplaySize(1024, 768);

    const basePanel = this.rexUI.add
      .roundRectangle(512, 424, 400, 300, 10, 0xffffffff)
      .setStrokeStyle(2, 0x000000);

    const title = this.add
      .text(512, 150, "Host Game", {
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

    const pName = this.add
      .text(512, 368, "Enter player name", {
        fontFamily: "monospace",
        fontSize: "22px",
        color: "#000000ff",
        backgroundColor: "#a5a5a5ff",
        padding: { x: 85, y: 10 },
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
      .text(512, 405, "Max. 15 characters!", {
        fontFamily: "monospace",
        fontSize: "16px",
        color: "#000000ff",
      })
      .setOrigin(0.5, 0.5);
  }
}
