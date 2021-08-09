import "phaser";
import { GameScene } from "./GameScene";
import { TabsManager, TabsManagerProps } from "./TabsManager";
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
  tabsManager: TabsManager = null;
}
window.onload = () => {
  const mapEditor = new MapEditor(config);
  const tmInterface: TabsManagerProps = {
    mapEditor: mapEditor
  }
  const tabs = new TabsManager(tmInterface);
  mapEditor.scene.add('GameScene', GameScene)
  mapEditor.scene.start('GameScene')
};