export function createUIButton(scene, label, color) {
  const button = scene.rexUI.add.label({
    background: scene.rexUI.add.roundRectangle(0, 0, 160, 75, 10, color),
    text: scene.add.text(0, 0, label, {
      fontSize: "22px",
      fontFamily: "monospace",
      color: "#ffffff",
    }),
    space: { left: 20, right: 20, top: 15, bottom: 15 },
    align: "center",
  });

  button.fillColor = color;
  button
    .setInteractive({ useHandCursor: true })
    .on("pointerover", () => {
      button
        .getElement("background")
        .setFillStyle(
          Phaser.Display.Color.ValueToColor(color).darken(20).color
        );
    })
    .on("pointerout", () => {
      button.getElement("background").setFillStyle(color);
    });

  return button;
}

export function createPlayerPanel(scene, xValue, yValue) {
  const playerPanel = scene.rexUI.add
    .roundRectangle(xValue, yValue, 275, 125, 10, 0xffffffff) // p1 = 336, 315, p2 = 688, 315, p3 = 336, 475, p4 = 688, 475,
    .setStrokeStyle(2, 0x000000);
}
