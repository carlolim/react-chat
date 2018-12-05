import { createStore, applyMiddleware } from 'redux';
import database from './firebase';
import thunkMiddleware from 'redux-thunk';

/**
 * ACTION TYPES
 */
const GET_MESSAGES = "get all messages append sa store";
const ADD_MESSAGE = "append new message from firebase to store";
const ADD_USER = "append new user to store";
const GET_USERS = "get all users";
//const ADD_TASK = 'add task'
//const REMOVE_TASK = 'remove task'
//const GET_TASKS = 'get tasks'
//const UPDATE_TASKS = 'update tasks'

/**
 * ACTION CREATORS
 */
export const getMessages = (messages) => ({ type: GET_MESSAGES, payload: messages });
export const addMessage = (message) => ({ type: ADD_MESSAGE, payload: message });
export const addUser = (user) => ({type: ADD_USER, payload: user });
export const getUsers = (users) => ({ type: GET_USERS, payload: users });
//export const addTask = (task) => ({type: ADD_TASK, task});
//export const removeTask = (task) => ({type: REMOVE_TASK, task});
//export const getTasks = (tasks) => ({type: GET_TASKS, tasks});
//export const updateTasks = (tasks) => ({type: UPDATE_TASKS, tasks});

/**
 * THUNKS
 */
export function getMessagesThunk() {
  return dispatch => {
    const messages = [];
    database.ref(`/messages`).once('value', snap => {
      snap.forEach(data => {
        messages.push(data.val());
      });
    });
    dispatch(getMessages(messages));
  }
}

export function getUsersThunk() {
  return dispatch => {
    const users = [];
    database.ref(`/users`).once('value', snap => {
      snap.forEach(data => {
        users.push(data.val().name);
      });
      dispatch(getUsers(users));
    });
  }
}

export function watchMessageAddedEvent(dispatch) {
  database.ref(`/messages`).on('child_added', snap => {
    dispatch(addMessage(snap.val()));
  });
}

export function watchUserAddedEvent(dispatch) {
  database.ref(`/users`).on('child_added', snap => {
    dispatch(addUser(snap.val()));
  });
}

//export function getTasksThunk() {
//  return dispatch => {
//    const tasks = [];
//    database.ref(`/`).once('value', snap => {
//          snap.forEach(data => {
//            let task = data.val();
//            tasks.push(task)
//          })
//      })
//    .then(() => dispatch(getTasks(tasks)))
//  }
//}
//
//export function watchTaskAddedEvent(dispatch) {
//  database.ref(`/`).on('child_added', (snap) => {
//    dispatch(addTask(snap.val()));
//  });
//}
//
//export function watchTaskRemovedEvent(dispatch) {
//  database.ref(`/`).on('child_removed', (snap) => {
//    dispatch(removeTask(snap.val()));
//  });
//}
//
//export function watchTaskUpdateEvent(dispatch) {
//  database.ref(`/`).on('value', (snap) => {
//    let tasks = [];
//    snap.forEach(data => {
//      let task = data.val();
//      tasks.push(task);
//    });
//    dispatch(getTasks(tasks))
//  });
//}
/**
 * REDUCER
 */

const initialState = {
  users: [],
  messages: []
}
function Reducer (state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return { ...state, messages: action.payload };
    case ADD_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload.name] };
    case GET_USERS:
      return { ...state, users: action.payload };
    //case GET_TASKS:
    //  return action.tasks
    //case ADD_TASK:
    //  return [...state, action.task]
    //case REMOVE_TASK:
    //  return state.filter(task => task.id !== action.task.id)
    //case UPDATE_TASKS:
    //  return action.tasks;
    default:
      return state
  }
}


export default createStore(Reducer, applyMiddleware(thunkMiddleware))