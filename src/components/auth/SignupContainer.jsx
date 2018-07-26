import React, { Component } from 'react';
import { signUpUser, clearAuthError } from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SignupDisplay from './SignupDisplay';

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

  agreeToTerms = () => {
    this.setState({showTerms: false, termsAccepted: true});
  }

  showToS = () => {
    this.setState({showTerms: true});
  }

  renderAlert = () => {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  clear = () => {
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
    return (
      <SignupDisplay 
        state={ this.state }
        handleInputChange={ this.handleInputChange }
        handleFormSubmit={ this.handleFormSubmit }
        agreeToTerms={ this.agreeToTerms }
        showToS={ this.showToS }
        renderAlert={ this.renderAlert }
        authenticated={ this.props.authenticated }
        { ...this.props}
      />
    )
  }

  validate = () => {
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
