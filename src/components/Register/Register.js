import React from 'react';
import './Register.css'; // Make sure you have the corresponding CSS file

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
      error: '' // State to handle error messages
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  validateForm = () => {
    const { email, name, password } = this.state;
    if (!email || !name || !password) {
      this.setState({ error: 'Please fill in all fields.' });
      return false;
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    if (!passwordRegex.test(password)) {
      this.setState({
        error: 'Password must be longer than 6 characters and contain at least one number and one special character.'
      });
      return false;
    }

    this.setState({ error: '' }); // Clear any previous errors
    return true;
  }

  onSubmit = () => {
    if (!this.validateForm()) {
      return; // Stop the onSubmit if the validation fails
    }

    fetch('http://localhost:3001/register', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.id) {
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      } else {
        this.setState({ error: 'Unable to register, please try again.' });
      }
    })
    .catch(err => {
      console.error(err);
      this.setState({ error: 'An error occurred during registration, please try again.' });
    });
  }

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 tc fw6 ph0 mh0">Register Now!!</legend>
              <div className="mt3">
                <label className="db fw6 tc lh-copy f6" htmlFor="name">Name</label>
                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
              </div>
              <div className="mt3">
                <label className="db fw6 tc lh-copy f6" htmlFor="email-address">Email</label>
                <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 tc lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
              </div>
            </fieldset>
            <div className="tc">
              <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="button" value="Register" />
            </div>
            {this.state.error && <div className="error-message">{this.state.error}</div>}
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
