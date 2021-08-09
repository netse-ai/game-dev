import { FirebaseManager } from "./FirebaseManager";

export interface StateModelProps {
}

export class StateModel {
  constructor(stateModelProps?: StateModelProps) {
    this.firebaseManager = new FirebaseManager({
      firebaseConfig: {
        apiKey: "AIzaSyDkFrHCxx8FQvT9zuFvVfgWqYh-xL6QP0Q",
        authDomain: "game-f405d.firebaseapp.com",
        databaseURL: "https://game-f405d-default-rtdb.firebaseio.com",
        projectId: "game-f405d",
        storageBucket: "game-f405d.appspot.com",
        messagingSenderId: "461478522315",
        appId: "1:461478522315:web:a68eb48c7c16a99d535a4e",
        measurementId: "G-N4F7GY6VY3"
      }
    })
  }
  firebaseManager: FirebaseManager = null;
}