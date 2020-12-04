import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB_6rkVF6P2fBIroPwPVszsisSkJ7pk-Xo",
    authDomain: "schoolpharmacyapp.firebaseapp.com",
    projectId: "schoolpharmacyapp",
    storageBucket: "schoolpharmacyapp.appspot.com",
    messagingSenderId: "1054998853054",
    appId: "1:1054998853054:web:b6c242514538e4603035ef"
}

class Fire {
    constructor(callback) {
        this.init(callback)
    }
    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                callback(null, user)
            } else {
                firebase
                    .auth()
                    .signInAnonymously()
                    .catch(error => {
                        callback(error)
                    });
            }
        });
    }

    getLists(callback) {
        let ref = firebase
            .firestore()
            .collection("users")
            .doc(this.userId)
            .collection("lists");

        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = [];

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data()});
            });

            callback(lists);
        })
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

//    detach() {
//       this.unsubscribe();
//    }
}

export default Fire;