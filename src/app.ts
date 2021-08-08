import "phaser";
import { GameScene } from "./GameScene";
const config = {
  title: "MapEditor",
  width: 800,
  height: 600,
  parent: "game",
  backgroundColor: "#DEDEDE"
};
export class MapEditor extends Phaser.Game {
  constructor(config: any) {
    super(config);
  }
}
window.onload = () => {
  var game = new MapEditor(config);
  game.scene.add('GameScene', GameScene)
  game.scene.start('GameScene')
};