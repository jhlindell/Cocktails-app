import React, { Component } from 'react';
import { signInUser, clearAuthError } from '../../actions/authActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SigninDisplay from './SigninDisplay';

class Signin extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentWillMount(){
    this.props.clearAuthError();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.authenticated){
      this.props.history.push('/recipes');
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.signInUser({username: this.state.username, password: this.state.password});
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

  cancel = () => {
    this.props.history.push('/');
  }

  render(){
    return (
      <SigninDisplay 
        handleInputChange={ this.handleInputChange }
        handleFormSubmit={ this.handleFormSubmit }
        renderAlert={ this.renderAlert}
        authenticated={ this.props.authenticated }
        cancel={ this.cancel}
        state={ this.state }
      />
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, errorMessage: state.auth.error };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ signInUser, clearAuthError }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
