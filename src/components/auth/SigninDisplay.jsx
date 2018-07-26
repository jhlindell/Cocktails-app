import React from 'react';

const styles = {
  componentStyle: {
    display: 'flex',
    margin: 'auto',
  },

  cardStyle: {
    display: 'flex',
    textAlign: 'center',
  },

  bodyStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}

const SigninDisplay = (props) => {
  return (
    <div style={ styles.componentStyle }>
      <div className="card" style={ styles.cardStyle }>
        <div className="card-header">
          <h3>Please Sign In</h3>
        </div>
        <div className="card-block" >
          <form onSubmit={ props.handleFormSubmit } style={ styles.bodyStyle }>
            <div className="form-group mt-2">
              <input name="username" type="text"
                onChange={(e) => { props.handleInputChange(e) }}
                placeholder="Username" value={props.state.username} />
            </div>
            <div className="form-group">
              <input name="password" type="password"
                onChange={(e) => { props.handleInputChange(e) }}
                placeholder="Password" value={ props.state.password } />
            </div>
            { props.renderAlert() }
            {/* <Link className="mb-2" to="/signInTrouble">Trouble Signing In?</Link> */}
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary"
              onClick={()=> props.cancel()}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninDisplay;