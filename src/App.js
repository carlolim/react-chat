import React, { Component } from 'react';
import './nes.min.css';
import './index.css';
import { addTaskToFirebase, removeTaskFromFirebase, register, addMessageToFirebase }  from './firebase'
import { connect } from 'react-redux'
import { watchMessageAddedEvent, watchUserAddedEvent } from './store'
import Register from "./register";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  handleMessageChange(e) {
    this.setState({...this.state, message: e.target.value});
  }

  handleAddMessage() {
    if(this.hasUser()) {
        if(this.state.message !== '') {
            let user = JSON.parse(localStorage.getItem('user'));
            addMessageToFirebase({
                userId: user.id,
                content: this.state.message,
                user: user
            }); 
            this.setState({...this.state, message: ''});
        }
    }
    else {
        window.location.reload();
    }
  }

  hasUser(){
      return localStorage.getItem('user') !== null;
  }

  isMe(userId) {
      let user = JSON.parse(localStorage.getItem('user'));
      console.log(user.id);
      console.log(userId);
      return user.id === userId;
  }

  render() {
    return (
      <div style={{maxWidth: '600px', margin: '0 auto', marginTop: '100px'}}>
          {this.hasUser() ? 

              <div>
                  <section className="balloon container with-title">
                    <div className="messages">

                      {this.props.state.messages.map((item, index) => 
                          <div className={`text-${ this.isMe(item.userId) ? 'right' : 'left' }`} key={index}>
                            <div className={`balloon from-${ this.isMe(item.userId) ? 'right' : 'left' }`}>
                              <p>{item.content}</p>
                            </div>
                            <i className={`message-sender text-${ this.isMe(item.userId) ? 'right' : 'left' }`}>{item.user.name}</i>
                          </div>
                      )}

                    </div>
                  </section>

                  <br />

                  <section className="form container with-title">
                      <h2 className="title">Message</h2>
                      <div className="field">
                          <form 
                              onSubmit={(e) => {
                                  e.preventDefault();
                                  this.handleAddMessage();
                              }}>
                              <input value={this.state.message} onChange={this.handleMessageChange.bind(this)} id="name_field" type="text" name="name" className="input" />
                              <button type="button" className="btn">Send</button>
                          </form>
                      </div>
                  </section>
              </div>
              :
              <Register />
          }
      </div>
    );
  }
}

const mapState = state => ({
  state
})

const mapDispatch = dispatch => {
  //dispatch(getTasksThunk());
  //watchTaskAddedEvent(dispatch);
  //watchTaskRemovedEvent(dispatch);
  //watchTaskUpdateEvent(dispatch);
  watchMessageAddedEvent(dispatch);
  watchUserAddedEvent(dispatch);
  return {
  }
}
export default connect(mapState, mapDispatch)(App);