import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Row } from 'reactstrap';
import Bottle from '../../bottle.jpeg';

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

  picStyle: {
    height: '160px',
    margin: 'auto',
    padding: '20px',
  },

  centering: {
    display: 'flex',
    // flexDirection: 'column',
    margin: 'auto'
  }
}

const StockItemDetailDisplay = (props) => {
  return (
    <div style={ styles.stockItem }>
      { props.stockItem ? 
      <Card style={ styles.card }>
        <CardHeader >
          <strong>{ props.stockItem.name }</strong>
        </CardHeader>
        <CardBody>
          <Row>
            <Col xs="3">
              <img src={ Bottle } style={ styles.picStyle } alt="bottle" />
            </Col>
            <Col xs="9" style={ styles.centering }>
              <p>{ props.stockItem.description }</p>            
            </Col>
          </Row>
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
              onClick={()=> props.history.push(`/stockitems/edit/${ props.match.params.id }`)}>
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