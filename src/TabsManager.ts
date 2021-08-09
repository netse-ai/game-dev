import { MapEditor } from "./app";

export interface TabsManagerProps {
  mapEditor: MapEditor;
}

export class TabsManager {
  constructor(TabsManagerProps?) {
    this.mapEditor = TabsManagerProps.mapEditor;
    this.tabs = this.getTabs()
  }

  tabs: HTMLElement[] = [];
  mapEditor: MapEditor;

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
    const tabs: Element = evt.target as Element;
    const tab: HTMLDivElement = document.createElement("div");
    const idNumber = tabs.children.length + 1;
    tab.id = `tab-${idNumber};`
    tab.style.height = "50px"
    tab.style.width = "100px"
    tab.style.backgroundColor = "#dedede"
    tab.textContent = `tab ${idNumber}`
    tab.classList.add("flex-end")
    document.getElementById("tabs").appendChild(tab)
  }
}