export function createUIButton(scene, label, color, onClick) {
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
