import firebase from "firebase";
import uuid from 'uuid/v4';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAurCWIRGX8SCaNGIyfThNKkvr8FrJScn8",
  authDomain: "react-firebase-e48ce.firebaseapp.com",
  databaseURL: "https://react-firebase-e48ce.firebaseio.com",
  projectId: "react-firebase-e48ce",
  storageBucket: "",
  messagingSenderId: "724913728461"
};


firebase.initializeApp(config);
const database = firebase.database()


export const addTaskToFirebase = (task) => {
 const id = uuid()
 database.ref(`/${id}`).set({
 	task, id
 });
}

export const removeTaskFromFirebase = (id) => {
	database.ref(`/${id}`).remove();
}

export const register = (name) => {
	const id = uuid()
	firebase.auth().createUserWithEmailAndPassword(name, id).catch(function(error) {
	  console.log(error);
	});
}

export const addMessageToFirebase = (message) => {
	database.ref(`/messages`).push(message);
}

export const addUserToFirebase = (name) => {
	if(name !== '' && name !== null && name !== undefined) {
		const id = uuid()
		database.ref(`/users`).push({ name, id }, function (error) {
			if (error) {
				console.log("Registration error: ", error);
			}
			else {
				let user = { id, name };
				localStorage.setItem('user', JSON.stringify(user));
				addMessageToFirebase({
					content: name + " joined the chat.",
					userId: '1',
					user: {
						id: '1', name : '[system]'
					}
				})
				window.location.reload();
			}
		});
	}
}

export default database