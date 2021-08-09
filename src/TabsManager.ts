import { MapEditor, MapEditorProps } from "./app";
import { GameScene, GameSceneProps } from "./GameScene";
import { StateModel } from "./StateModel";

export interface TabsManagerProps {
  stateModel: StateModel;
}

export class TabsManager {
  constructor(tabsManagerProps?: TabsManagerProps) {
    this.stateModel = tabsManagerProps.stateModel;
    this.tabs = this.getTabs()
  }


  mapEditor: MapEditor = null;
  stateModel: StateModel;
  tabs: HTMLElement[] = [];

  public getTabs = (): HTMLElement[] => {
    const tabs: HTMLElement = document.getElementById("tabs");
    tabs.onclick = this.addTab
    const children: HTMLElement[] = [];
    if (tabs && tabs.childElementCount) {
      const childNodes = tabs.childNodes
      childNodes.forEach((child: HTMLElement) => {
        const classNames: string = child["className"];
        if (classNames) {
          const contains = classNames.search('tab') ? true : false;
          if (contains) {
            children.push(child)
          }
        }
      })
    }
    return children;
  }

  public addTab = (evt: MouseEvent) => {
    console.log(evt)
    const tabs: Element = evt.target as Element;
    const tab: HTMLDivElement = document.createElement("div");
    const idNumber = tabs.children.length + 1;
    tab.id = `tab-${idNumber};`
    tab.style.height = "50px"
    tab.style.width = "100px"
    tab.style.backgroundColor = "#dedede"
    tab.textContent = `tab ${idNumber}`
    tab.classList.add("flex-end")
    this._addSceneContext(tab)
    document.getElementById("tabs").appendChild(tab)
  }

  private _addSceneContext = (tab: HTMLDivElement) => {
    const ctx = document.createElement("div");
    ctx.className = tab.id
    document.body.appendChild(ctx)
    const gmInterface: GameSceneProps = {
      id: tab.id,
      firebaseManager: this.stateModel.firebaseManager
    }
    const gameScene = new GameScene(gmInterface)
    const mapEditorConfig: MapEditorProps = {
      title: `MapEditor - ${tab.id}`,
      width: 800,
      height: 600,
      parent: tab.id,
      backgroundColor: "#DEDEDE"
    };
    this.mapEditor = new MapEditor(mapEditorConfig)
    this.mapEditor.scene.add(gmInterface.id, gameScene)
    this.mapEditor.scene.start(gmInterface.id)
    const game: HTMLElement = document.getElementById("game");
    game.classList.add("display-none")
  }
}