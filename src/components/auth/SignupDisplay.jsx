import React from 'react';

const styles = {
  componentStyle: {
    display: 'flex',
    margin: 'auto',
  },

  cardStyle: {
    display: 'flex',
    width: '250px',
    textAlign: 'center',
  },

  ToSStyle: {
    display: 'flex',
    width: '750px',
    textAlign: 'center',
  },

  bodyStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  errorText: {
    color: 'red',
    marginTop: '5px',
  },
}

const SignupDisplay = (props) => {
  return (
    <div style={ styles.componentStyle }>
      {props.state.showTerms && <div className="card" style={ styles.ToSStyle } >
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
          <button 
            type='button' 
            className="btn btn-primary" 
            onClick={() => props.agreeToTerms()}
          >
            I agree to these terms.
          </button>
        </div>
      </div>}
      { !props.state.showTerms && <div className="card" style={ styles.cardStyle } >
        <div className="card-header">
          <h3>Sign Up</h3>
        </div>
        <div className='card-block'>
          <form onSubmit={ props.handleFormSubmit } style={ styles.bodyStyle }>
            <div className="form-group mt-2">
              <input name="username" type="text"
                onChange={(e) => {props.handleInputChange(e)}}
                value={ props.state.username } placeholder="Username" />
                { props.state.errors.username && 
                  <div style={ styles.errorText }>
                    { props.state.errors.username }
                  </div>}
            </div>
            <div className="form-group">
              <input name="email" type="email"
                onChange={(e) => { props.handleInputChange(e) }}
                value={ props.state.email } placeholder="Email" />
                {props.state.errors.email && 
                  <div style={ styles.errorText }>
                    { props.state.errors.email }
                  </div>}
            </div>
            <div className="form-group">
              <input name="password" type="password"
                onChange={(e) => { props.handleInputChange(e)} }
                value={ props.state.password } placeholder="Password" />
                { props.state.errors.password && 
                  <div style={ styles.errorText }>
                    { props.state.errors.password }
                  </div>}
            </div>
            <div className="form-group mb-4">
              <input name="passwordConfirm" type="password"
                onChange={(e) => {props.handleInputChange(e)}}
                value={ props.state.passwordConfirm } placeholder="Confirm Password"/>
                { props.state.errors.passwordConfirm && 
                  <div style={ styles.errorText }>
                    { props.state.errors.passwordConfirm }
                  </div>}
            </div>
            { props.renderAlert() }
            {!props.state.showTerms && !props.state.termsAccepted && 
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={()=> props.showToS()}
              >
                View Terms
              </button>}
            { props.state.termsAccepted && 
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                Submit
              </button>}
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={()=> props.history.push('/')}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>}
    </div>
  );
};

export default SignupDisplay;