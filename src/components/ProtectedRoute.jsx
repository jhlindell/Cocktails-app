import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends Component{
  render() {
    const componentStyle = {
      display: 'flex',
      flex: '1 1 100%',
    };
    
    return (this.isAuthed()) ?
        <div style={componentStyle} id="protected">
          {this.props.children}
        </div> :
        <Redirect to='/signin' />;
  }
  isAuthed() {
    return this.props.authenticated;
  };
}


function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps, null)(ProtectedRoute);
