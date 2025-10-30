import Phaser from "phaser";
import { io } from "socket.io-client";

import { Boot } from "./scenes/Boot.js";
import { Preloader } from "./scenes/Preloader.js";
import { MainMenu } from "./scenes/MainMenu.js";

const socket = io("http://localhost:3333");

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

// Basic Phaser config
const config = {
  type: Phaser.AUTO,
  width: 1024, // 512
  height: 768, //384
  backgroundColor: "#000000ff",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu],
};

new Phaser.Game(config);
