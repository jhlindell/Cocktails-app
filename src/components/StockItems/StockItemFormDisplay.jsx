import React from 'react';
import { Button, CardBody, CardFooter, CardHeader, Form, FormGroup, Input, Label} from 'reactstrap';

const StockItemFormDisplay = (props) => {
  return (
    <Form onSubmit={ props.formSubmit }>
        <CardHeader>
          <h3>Add new ingredient</h3>
        </CardHeader>
        <CardBody>
          <FormGroup>
            <Label for="itemName">Name</Label>
            <Input name="name" id="itemName"
              className={"" + props.state.errors.name ? "is-invalid": ""}
              type="text"
              onChange={(e) => { props.inputChange(e)} }
              placeholder="Name"
              value={ props.state.name }/>
            { props.state.errors.name && 
              <div>
                { props.state.errors.name }
              </div>}
          </FormGroup>
          <FormGroup>
            <Label for="itemDescription">Description</Label>
            <Input name="description" id="itemDescription"
              className={"" + props.state.errors.description ? "is-invalid": ""}
              type="text"
              onChange={(e) => { props.inputChange(e)} }
              placeholder="Description"
              value={ props.state.description }/>
            { props.state.errors.description && 
              <div>
                { props.state.errors.description }
              </div>}
          </FormGroup>
        </CardBody>
        <CardFooter>
          <div className="btn-group" >
            <Button color="primary" type="submit">
              Submit
            </Button>
            <Button color="secondary" type="button" onClick={()=> props.cancel()}>
              Cancel
            </Button>
          </div>
        </CardFooter>
    </Form>
  );
};

export default StockItemFormDisplay;