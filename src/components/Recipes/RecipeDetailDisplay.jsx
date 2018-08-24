import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row, Table } from 'reactstrap';
import Cocktail from '../../cocktail.jpeg';

const styles = {
  outerDiv: {
    display: 'flex',
    width: '100%',
  },

  button: {
    margin: 'auto'
  },

  card: {
    margin: 'auto',
    maxWidth: '60%',
    fontSize: '0.85rem'
  },

  header: {
    fontSize: '1rem',
  },

  picStyle: {
    height: '160px',
    margin: 'auto',
    padding: '20px',
  },

  centering: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto'
  }
}


const RecipeDetailDisplay = (props) => {
  return (
    <div style={ styles.outerDiv }>
      { props.recipe ? 
        <Card style={ styles.card }>
          <CardHeader style={styles.header}>
            <strong>{ props.recipe.name }</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs="9" style={styles.centering}>             
                <p><strong>Description:</strong></p>
                <p>{ props.recipe.description }</p>
              </Col>
              <Col xs="3">
                <img src={Cocktail} style={styles.picStyle} alt="cocktail"/>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col xs="6">
                <p><strong>Ingredients:</strong></p>
                <Table>
                  {/* <thead>
                    <tr>
                      <th>measure:</th>
                      <th>unit:</th>
                      <th>name:</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    { props.recipe ? 
                      props.renderIngredients() : 
                        <span>
                          Loading...
                        </span>
                    }   
                  </tbody>   
                </Table>
              </Col>
              <Col xs="6" style={styles.centering}>
                <p><strong>Instructions:</strong></p>
                <ol>
                  { props.recipe.instructions.map((instruction) => {
                    return <li key={instruction}>{instruction}</li>
                  })}
                </ol>
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <div className="btn-group" style={ styles.button }>
              <Button
                color="primary"
                type="button"
                onClick={()=> props.history.push('/recipes')}>
                Go Back
              </Button>
              { props.authenticated &&<Button 
                color="warning"
                type="button"
                onClick={()=> props.history.push(`/recipes/edit/${ props.match.params.id}`)}>
                Edit
                </Button>}
              { props.authenticated && <Button 
                color="danger" 
                type="button"
                onClick={()=> props.deleteItem()}>
                Delete
              </Button>}
            </div>
          </CardFooter>
        </Card> :
        <div>
          Loading...
        </div>
      }
    </div>
  );
};

export default RecipeDetailDisplay;