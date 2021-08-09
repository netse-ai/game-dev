import "phaser";
import { Math, Tilemaps } from "phaser";
import { FirebaseManager } from "./FirebaseManager";

import "firebase"

export interface GameSceneProps {
  id: string;
  firebaseManager: FirebaseManager;
}

interface TileMatrixTile {
  currentTile: number;
  x: number;
  y: number;
}

interface TileMatrix {
  tilemap: Array<TileMatrixTile[]>;
}

export class GameScene extends Phaser.Scene {
  constructor(gameSceneProps?: GameSceneProps) {
    super({
      key: gameSceneProps.id
    });
    this.id = gameSceneProps.id;
    this.firebaseManager = gameSceneProps.firebaseManager
  }

  init(params): void {
    this.database = this.firebaseManager.getDatabase()
    this.camera = this.cameras.main;
    this.camera.setBounds(0, 0, 800, 600, true)
    this.map = this.add.tilemap();
    this.graphics = new Phaser.GameObjects.Graphics(this)
    this._configureInputs()
    this.firebaseManager.readDB(this.id, this._readDB)
  }

  id: string;
  camera: Phaser.Cameras.Scene2D.Camera = null;
  map: Phaser.Tilemaps.Tilemap = null;
  graphics: Phaser.GameObjects.Graphics = null;
  math: Math = null;
  currentTile: number = 0;
  firebaseManager: FirebaseManager = null;
  database: firebase.default.database.Database = null;
  dbPayload: any = null

  tileArr: TileMatrix = {
    tilemap: []
  }

  preload(): void {
    this.load.image('ground_1x1', 'assets/tilemaps/tiles/ground_1x1.png');
  }

  create(): void {
    //add the ground imagery to the map
    const tsName = 'ground_1x1'
    this.map.addTilesetImage(tsName);
    //create a blank tilemap layer
    this.map.createBlankLayer(this.id, tsName, 32, 32, 60, 60)
    this._createTileSelector(tsName)
  }

  update(): void {
    if (this.input.mousePointer.isDown) {
      this._addTile()
    }
  }


  private _createTileSelector = (tsName: string) => {
    //create a group and add the graphics
    let tileSelector = this.add.group();
    tileSelector.add(this.graphics);
    //find the tileset
    const tileset = this.map.tilesets.find((ts: Tilemaps.Tileset) => ts.name === tsName)
    //add the tileset to the map 
    const tilesetWidth: number = tileset.tileWidth * tileset.total
    const tileStrip: Phaser.GameObjects.GameObject = tileSelector.create(tilesetWidth / 2, 30, 'ground_1x1', null, true, true);
    //toggle as interactive so we can capture the pointer events
    tileStrip.setInteractive()
    tileStrip.on('pointerdown', this._pickTile)
  }

  private _addTile = (): void => {
    const isDown: boolean = this.input.mousePointer.leftButtonDown();
    if (isDown) {
      const tileX = this.map.worldToTileX(this.input.activePointer.worldX);
      const tileY = this.map.worldToTileX(this.input.activePointer.worldY);
      if (tileX > 0 && tileY > 0) {
        const tile = {
          currentTile: this.currentTile,
          x: tileX,
          y: tileY,
        }
        this.tileArr.tilemap[tileX][tileY] = tile;
        this.firebaseManager.writeToDB(this.id, "set", this.tileArr)
      }
    }
  }

  private _pickTile = (input: Phaser.Input.InputPlugin) => {
    this.currentTile = Math.Snap.Floor(input.x, 32) / 32
  }

  private _configureInputs = (): void => {
    this.input.keyboard.on('keydown-W', () => {
      this.camera.y += 16
    })
    this.input.keyboard.on('keydown-S', () => {
      this.camera.y -= 16
    })
    this.input.keyboard.on('keydown-A', () => {
      this.camera.x += 16
    })
    this.input.keyboard.on('keydown-D', () => {
      this.camera.x -= 16
    })
  }

  private _readDB = (payload: any) => {
    if (payload) {
      console.log(this.id, payload)
      this.tileArr.tilemap = payload.payload.tilemap
      this.tileArr.tilemap.forEach((tileMatrix: TileMatrixTile[]) => {
        tileMatrix.forEach((tile: TileMatrixTile) => {
          this.map.putTileAt(tile.currentTile, tile.x, tile.y)
        })
      })
    } else {
      this._createTileArr()
      this.firebaseManager.writeToDB(this.id, "set", this.tileArr)
    }
  }

  private _createTileArr = (): void => {
    for (let i = 0; i < 60; i++) {
      let arr: TileMatrixTile[] = []
      for (let j = 0; j < 60; j++) {
        const tile: TileMatrixTile = {
          currentTile: -100,
          x: -100,
          y: -100,
        }
        arr.push(tile)
      }
      this.tileArr.tilemap.push(arr)
    }
  }
};