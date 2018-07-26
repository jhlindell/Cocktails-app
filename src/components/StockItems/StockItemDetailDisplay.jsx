import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

const styles = {
  stockItem: {
    display: 'flex',
    width: '100%'
  },

  button: {
    margin: 'auto'
  },

  card: {
    maxWidth: '50%',
    margin: 'auto'
  },
}

const StockItemDetailDisplay = (props) => {
  return (
    <div style={ styles.stockItem }>
      { props.stockItem ? 
      <Card style={ styles.card }>
        <CardHeader>
          { props.stockItem.name}
        </CardHeader>
        <CardBody>
          <p>{ props.stockItem.description}</p>            
        </CardBody>
        <CardFooter>
          <div className="btn-group" style={ styles.button }>
            <Button
              color="primary"
              type="button"
              onClick={()=> props.history.push('/stockitems')}>
              Go Back
            </Button>
            { props.authenticated && <Button 
              color="warning"
              type="button"
              onClick={()=> props.history.push(`/stockitems/edit/${ props.match.params.id}`)}>
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
      <div>Loading...</div>}
    </div>
  );
};

export default StockItemDetailDisplay;