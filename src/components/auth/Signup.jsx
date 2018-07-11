import React, { Component } from 'react';
import { signUpUser, clearAuthError } from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      showTerms: false,
      termsAccepted: false,
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const valid = this.validate();
    if(valid){
      let modProps = {
        username: this.state.username.toLowerCase(),
        email: this.state.email.toLowerCase(),
        password: this.state.password,
        passwordConfirm: this.state.passwordConfirm,
      };
      this.props.signUpUser(modProps);
      // this.props.history.push('/signin');
      console.log(modProps);
    }
  }

  componentWillMount(){
    this.props.clearAuthError();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authenticated){
      this.props.history.push('/recipes');
    }
  }

  agreeToTerms(){
    this.setState({showTerms: false, termsAccepted: true});
  }

  showToS(){
    this.setState({showTerms: true});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  clear(){
    this.setState({
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      errors: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
      }
    });
  }

  render(){
    const componentStyle = {
      display: 'flex',
      margin: 'auto',
    };

    const cardStyle = {
      display: 'flex',
      width: '250px',
      textAlign: 'center',
    };

    const ToSStyle = {
      display: 'flex',
      width: '750px',
      textAlign: 'center',
    };

    const bodyStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    };

    const errorText = {
      color: 'red',
      marginTop: '5px',
    }

    return (
      <div style={componentStyle}>
        {this.state.showTerms && <div className="card" style={ToSStyle} >
          <div className="card-header">
            <h3>Terms of Service</h3>
          </div>
          <div className='card-block'>
            <p>
              These terms may be updated at any time. When these terms are modified, you must agree to the updated terms to continue using website.
            </p>
            <p> 
              Recipes posted should have proper attributions.           
            </p>
            <p>
              No Shitposting
            </p>
            <p>
              Be cool.
            </p>
          </div>
          <div className='card-footer'>
            <button type='button' className="btn btn-primary" onClick={()=>this.agreeToTerms()}>I agree to these terms.</button>
          </div>
        </div>}
        {!this.state.showTerms && <div className="card" style={cardStyle} >
          <div className="card-header">
            <h3>Sign Up</h3>
          </div>
          <div className='card-block'>
            <form onSubmit={this.handleFormSubmit} style={bodyStyle}>
              <div className="form-group mt-2">
                <input name="username" type="text"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.username} placeholder="Username" />
                  {this.state.errors.username && <div style={errorText}>{this.state.errors.username}</div>}
              </div>
              <div className="form-group">
                <input name="email" type="email"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.email} placeholder="Email" />
                  {this.state.errors.email && <div style={errorText}>{this.state.errors.email}</div>}
              </div>
              <div className="form-group">
                <input name="password" type="password"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.password} placeholder="Password" />
                  {this.state.errors.password && <div style={errorText}>{this.state.errors.password}</div>}
              </div>
              <div className="form-group mb-4">
                <input name="passwordConfirm" type="password"
                  onChange={(e) => {this.handleInputChange(e)}}
                  value={this.state.passwordConfirm} placeholder="Confirm Password"/>
                  {this.state.errors.passwordConfirm && <div style={errorText}>{this.state.errors.passwordConfirm}</div>}
              </div>
              {this.renderAlert()}
              {!this.state.showTerms && !this.state.termsAccepted && <button type="button" className="btn btn-primary" onClick={()=>this.showToS()}>View Terms</button>}
              {this.state.termsAccepted && <button type="submit" className="btn btn-primary">
                Submit
              </button>}
              <button type="button" className="btn btn-secondary"
                onClick={()=> this.props.history.push('/')}>
                Cancel
              </button>
            </form>
          </div>
        </div>}
      </div>
    );
  }

  validate() {
    this.clearErrors();
    const errors = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
    let isValid = true;

    if(!this.state.username){
      errors.username = 'Please enter a username';
      isValid = false;
    }

    if(!this.state.email) {
      errors.email = 'Please enter an email';
      isValid = false;
    }

    if(!this.state.password) {
      errors.password = 'Please enter a password';
      isValid = false;
    }

    if(!this.state.passwordConfirm) {
      errors.passwordConfirm = 'Please enter a password confirmation';
      isValid = false;
    }

    if(this.state.password !== this.state.passwordConfirm) {
      errors.password = 'Passwords must match';
      isValid = false;
    }

    this.setState({errors: errors});
    return isValid;
  }

  clearErrors(){
    this.setState({ errors: {username: '', email: '', password: '', passwordConfirm: ''} });
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signUpUser, clearAuthError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
