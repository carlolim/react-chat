import React, { Component } from 'react';
import './App.css';
import { addUserToFirebase }  from './firebase'
import { connect } from 'react-redux'
import { watchMessageAddedEvent } from './store'


class Register extends Component {
  render() {
    return (
      <div style={{maxWidth: '500px', margin: '0 auto', marginTop: '100px'}}>
          <section className="form container with-title">
              <h2 className="title">Register</h2>
              <div className="field">
                  <label htmlFor="name_field">Welcome adventurer! Please input your name.</label>

                  <form 
                      onSubmit={(e) => {
                          e.preventDefault();
                          addUserToFirebase(e.target.name.value);
                      }}>
                      <input id="name_field" type="text" name="name" className="input" />
                      <br />
                      <button type="button" className="btn">Submit</button>
                  </form>
              </div>
          </section>
      </div>
    );
  }
}

const mapState = state => ({
  state
})

const mapDispatch = dispatch => {
  return {
  }
}
export default connect(mapState, mapDispatch)(Register);