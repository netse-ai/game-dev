import firebase from 'firebase';

export interface FirebaseManagerProps {
  firebaseConfig: any;
}

export class FirebaseManager {
  constructor(FirebaseManagerProps) {
    // Initialize Firebase
    firebase.initializeApp(FirebaseManagerProps.firebaseConfig);
    firebase.analytics();
  }
  public getFirebase = () => {
    return firebase;
  }

  public getDatabase = () => {
    return firebase.database();
  }

  public writeToDB = (ref: string, type: string, payload: any) => {
    if (type === "set") {
      this.getDatabase().ref(ref).set({
        payload: payload
      });
    }
  }

  public readDB = (ref: string, callback: Function) => {
    this.getDatabase().ref(ref).on('value', (snapshot) => {
      const data = snapshot.val();
      return callback(data)
    })
  }
}