import "phaser";
import { FirebaseManager } from "./FirebaseManager";
import { GameScene, GameSceneProps } from "./GameScene";
import { StateModel } from "./StateModel";
import { TabsManager, TabsManagerProps } from "./TabsManager";

export interface MapEditorProps {
  title: string;
  width: number;
  height: number;
  parent: string;
  backgroundColor: string;
}

const mapEditorConfig: MapEditorProps = {
  title: "MapEditor",
  width: 800,
  height: 600,
  parent: "context-0",
  backgroundColor: "#DEDEDE"
};

export class MapEditor extends Phaser.Game {
  constructor(config: MapEditorProps) {
    super(config);
  }
}

window.onload = () => {
  const stateModel: StateModel = new StateModel()
  const mapEditor: MapEditor = new MapEditor(mapEditorConfig);
  const tmInterface: TabsManagerProps = {
    stateModel: stateModel
  }
  const tabs = new TabsManager(tmInterface);
  const gmInterface: GameSceneProps = {
    id: "test",
    firebaseManager: stateModel.firebaseManager
  }
  const gameScene = new GameScene(gmInterface)
  mapEditor.scene.add(gmInterface.id, gameScene)
  mapEditor.scene.start(gmInterface.id)
};