import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import './App.css';

const MODEL_ID = 'dall-e-3'; // Ensure this is your actual Model ID.

const returnJSONRequest = (text) => {
  const PAT = '18825784d0384fecb31c7b62f18829ff'; // Replace with your actual PAT.
  const USER_ID = 'openai'; // Replace with your actual User ID.
  const APP_ID = 'dall-e'; // Replace with your actual App ID.

  return {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "text": {
              "raw": text
            }
          }
        }
      ]
    })
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      isLoading: false,
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      },
      imageUrl: ''  // Clear imageUrl when a new user is loaded
    });
  }
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({
        isSignedIn: false,
        imageUrl: ''  // Clear imageUrl on signout
      });
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      });
    }
    this.setState({ route: route });
  }
  
  // Inside the App component in App.js

  onSubmit = () => {
    this.setState({ imageUrl: '', isLoading: true });
  
    fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`, returnJSONRequest(this.state.input))
      .then(response => response.json())
      .then(result => {
        if (result && result.outputs && result.outputs[0].data && result.outputs[0].data.image && result.outputs[0].data.image.base64) {
          this.setState({
            imageUrl: `data:image/jpeg;base64,${result.outputs[0].data.image.base64}`,
            isLoading: false
          });
  
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(data => {
            this.setState(prevState => ({
              user: {
                ...prevState.user,
                entries: data.entries // Correctly update entries assuming `data` has an `entries` field
              }
            }));
          })
          .catch(error => {
            console.log('Error updating entries:', error);
            this.setState({ isLoading: false });
          });
        } else {
          console.log('Invalid result data received.');
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        console.log('Error processing image:', error);
        this.setState({ isLoading: false });
      });
  }
  

  render() {
    const { isSignedIn, imageUrl, route, isLoading } = this.state;
    return (
      <div className='App'>
        <ParticlesBg num={20} type="polygon" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition imageUrl={imageUrl} isLoading={isLoading} />
            </div>
          : (
              route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
