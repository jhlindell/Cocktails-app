import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from 'reactstrap';

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
    maxWidth: '60%'
  },
}

const RecipeDetailDisplay = (props) => {
  return (
    <div style={ styles.outerDiv }>
      { props.recipe ? 
        <Card style={ styles.card }>
          <CardHeader>
            { props.recipe.name }
          </CardHeader>
          <CardBody>
            <p><strong>Description:</strong></p>
            <p>{ props.recipe.description }</p>
            <p><strong>Ingredients:</strong></p>
            <Table>
              <thead>
                <tr>
                  <th>measure:</th>
                  <th>unit:</th>
                  <th>name:</th>
                </tr>
              </thead>
              <tbody>
                { props.recipe ? 
                  props.renderIngredients() : 
                    <span>
                      Loading...
                    </span>
                }   
              </tbody>   
            </Table>
            <p><strong>Instructions:</strong></p>
            <ol>
              { props.recipe.instructions.map((instruction) => {
                return <li key={instruction}>{instruction}</li>
              })}
            </ol>
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