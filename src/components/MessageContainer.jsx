import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearMessage } from '../actions/index';

const styles = {
  component: {
    display: 'flex',
    height: '50px',
    width: '100%',
    justifyContent: 'left',
    alignItems: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    margin: 0
  },

  card: {
    padding: '5px',
    margin: '2px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
    color: 'white'
  },
}

class MessageContainer extends Component {
  clearMessage(id){
    this.props.clearMessage(id);
  }

  renderMessages(){
    if(this.props.messages.length){
      return(
        <div style={ styles.component }>
          { this.props.messages.map((message) =>
            <div 
              className="card" 
              onClick={()=>this.clearMessage(message.id)} 
              key={ message.id + message.message } 
              style={ styles.card }
            >
              <span>{message.message}</span>
            </div>
          )}
        </div>
      )
    }
  }

  render(){
    return (
      <div >
        { this.renderMessages() }
      </div>
    );
  }
}

function mapStateToProps(state){
  return { messages: state.messageReducer };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ clearMessage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);
