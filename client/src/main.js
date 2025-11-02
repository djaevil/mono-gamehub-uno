import Phaser from "phaser";
import { io } from "socket.io-client";
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

import { Boot } from "./scenes/Boot.js";
import { Preloader } from "./scenes/Preloader.js";
import { MainMenu } from "./scenes/MainMenu.js";
import { HostScene } from "./scenes/HostScene.js";
import { JoinScene } from "./scenes/JoinScene.js";
import { LobbyScene } from "./scenes/LobbyScene.js";

// const socket = io("http://localhost:3333");

// socket.on("connect", () => {
//   console.log("Connected:", socket.id);
// });

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
  parent: "app",
  dom: {
    createContainer: true,
  },
  scene: [Boot, Preloader, MainMenu, HostScene, JoinScene, LobbyScene],
  plugins: {
    scene: [
      {
        key: "rexUI",
        plugin: RexUIPlugin,
        mapping: "rexUI",
      },
    ],
  },
};

new Phaser.Game(config);
