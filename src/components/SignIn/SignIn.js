import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
      error: '' // Added for displaying error messages
    };
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = (event) => {
    event.preventDefault();
    const { signInEmail, signInPassword } = this.state;

    if (!signInEmail.trim() || !signInPassword.trim()) {
      this.setState({ error: 'Please fill in all fields.' });
      return;
    }

    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.setState({ error: '' });
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else {
        this.setState({ error: 'Incorrect email or password. Please try again.' });
      }
    })
    .catch(err => {
      console.log(err);
      this.setState({ error: 'An error occurred. Please try again later.' });
    });
  }

  render() {
    const { error } = this.state;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 tc fw6 ph0 mh0">Face-Detection</legend>
              <div className="mt3">
                <label className="db fw6 tc lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                  onChange={this.onEmailChange} 
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="email" 
                  name="email-address"  
                  id="email-address" 
                />
              </div>
              <div className="mv3">
                <label className="db fw6 tc lh-copy f6" htmlFor="password">Password</label>
                <input 
                  onChange={this.onPasswordChange} 
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                  type="password" 
                  name="password"  
                  id="password" 
                />
              </div>
            </fieldset>
            <div className="tc">
              <input 
                onClick={this.onSubmitSignIn} 
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" 
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="lh-copy mt3">
              <p onClick={() => this.props.onRouteChange('register')} className="f6 tc link pointer dim black db">Register</p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default SignIn;
