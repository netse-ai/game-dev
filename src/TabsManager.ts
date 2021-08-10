import { Modal } from "bootstrap";
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
    this.contexts = this.getContexts()
    const tabs: HTMLElement = document.getElementById("tabs");
    const addTabBtn: HTMLButtonElement = document.createElement("button");
    addTabBtn.onclick = this.addTab
    tabs.appendChild(addTabBtn)
    const input = document.getElementById("modal-input");
    input.oninput = this.handleInput
  }


  mapEditor: MapEditor = null;
  stateModel: StateModel;
  tabs: HTMLElement[] = [];
  contexts: HTMLElement[] = [];

  public getTabs = (): HTMLElement[] => {
    const tabs: HTMLElement = document.getElementById("tabs");
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

  public getContexts = (): HTMLElement[] => {
    const ctxWrapper: HTMLElement = document.getElementById("contexts");
    const children: HTMLElement[] = [];
    if (ctxWrapper && ctxWrapper.childElementCount) {
      const childNodes = ctxWrapper.childNodes
      console.log(childNodes)
      childNodes.forEach((child: HTMLElement) => {
        const id: string = child["id"];
        if (id) {
          const contains = id.search('context') === 0 ? true : false;
          if (contains) {
            children.push(child)
          }
        }
      })
    }
    return children;
  }

  public handleInput = (evt: KeyboardEvent) => {
    console.log(evt)
    evt.preventDefault()
  }

  public clickTab = (evt: MouseEvent) => {
    const modal = new Modal(".modal")
    modal.show()



    const tab: HTMLButtonElement = evt.target as HTMLButtonElement;
    const tokens: string[] = tab.id.split("-")
    const id: number = Number(tokens[tokens.length - 1])
    console.log(`context-${id}`)
    this.contexts.forEach((ctx: HTMLElement) => {
      if (ctx.id !== `context-${id}`) {
        ctx.classList.add("display-none")
        ctx.classList.remove("display")
      } else {
        console.log("?")
        ctx.classList.add("display")
        ctx.classList.remove("display-none")
      }
    })
    // const ctx: HTMLElement = document.getElementById("ctx");
    // const game: HTMLElement = document.getElementById("game");
    // game.classList.add("display-none")
  }


  public addTab = (evt: MouseEvent) => {
    console.log(evt)
    const tabs: HTMLElement = document.getElementById("tabs");
    const tab: HTMLButtonElement = document.createElement("button");
    const idNumber = tabs.children.length;
    console.log(tabs)
    tab.id = `tab-${idNumber - 1}`
    tab.textContent = `tab ${idNumber - 1}`
    tab.classList.add("flex-end")
    tab.classList.add("tab")
    tab.classList.add("button")
    tab.onclick = this.clickTab
    this._addSceneContext(tab)
    document.getElementById("tabs").appendChild(tab)
    this.tabs = this.getTabs()
  }

  private _addSceneContext = (tab: HTMLButtonElement) => {
    const ctxWrapper: HTMLElement = document.getElementById("contexts");
    const ctx = document.createElement("div");
    const idNumber = ctxWrapper.children.length;
    ctx.id = `context-${idNumber}`
    ctx.classList.add("display-none")
    ctxWrapper.appendChild(ctx)
    const gmInterface: GameSceneProps = {
      id: tab.id,
      firebaseManager: this.stateModel.firebaseManager
    }
    const gameScene = new GameScene(gmInterface)
    const mapEditorConfig: MapEditorProps = {
      title: `MapEditor - ${tab.id}`,
      width: 800,
      height: 600,
      parent: ctx.id,
      backgroundColor: "#DEDEDE"
    };
    this.contexts = this.getContexts()
    this.mapEditor = new MapEditor(mapEditorConfig)
    this.mapEditor.scene.add(gmInterface.id, gameScene)
    this.mapEditor.scene.start(gmInterface.id)

  }
}