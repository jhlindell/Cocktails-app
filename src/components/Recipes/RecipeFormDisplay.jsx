import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { 
  Button, 
  Card, CardBody, CardFooter, CardHeader, 
  Col, 
  Form, 
  FormGroup, 
  Input, 
  Label,
  Modal,
  Table
} from 'reactstrap';
import React, { Component } from 'react';
import StockItemForm from '../StockItems/StockItemForm';

const cardStyle = {
  display: 'flex',
  margin: 'auto',
  cardColumns: '1',
  fontSize: '0.8rem'
};

const modalStyle = {
  display: 'flex',
  width: '100%',
  textAlign: 'center'
}

class RecipeFormDisplay extends Component {
  clearTypeahead(){
    this.typeahead.getInstance().clear();
  }

  render() {
    return (
      <Card style={cardStyle}>
        <Form onSubmit={ this.props.handleFormSubmit }>
          <CardHeader>
            New Recipe
          </CardHeader>
          <CardBody>
            <FormGroup row>
              <Label for="recipeName" sm={3}>Name</Label>
              <Col sm={9}>
                <Input name="name" id="recipeName"
                  type="text"
                  onChange={(e) => { this.props.handleInputChange(e)} }
                  placeholder="Recipe Name"
                  value={ this.props.state.name }/>            
                { this.props.state.errors.name && <div>{ this.props.state.errors.name }</div> }
              </Col>
            </FormGroup>
            <FormGroup row> 
              <Label for="recipeDescription" sm={3}>Description</Label>
              <Col sm={9}>
                <Input name="description" id="recipeDescription"
                  type="text"
                  onChange={(e) => { this.props.handleInputChange(e)} }
                  placeholder="Description"
                  value={ this.props.state.description}/>  
                { this.props.state.errors.description && <div>{ this.props.state.errors.description }</div> }
              </Col>     
            </FormGroup>
            <div>
              <p>Ingredients:</p>
              { this.props.state.ingredients.length ? <Table striped>
                <thead>
                  <tr>
                    <th>Measure</th>
                    <th>Unit</th>
                    <th>Ingredient Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  { this.props.state.ingredients.map((ingredient, index) => {
                    return <tr key={ingredient.name + ingredient.measure}>
                      <td>{ingredient.measure}</td>
                      <td>{ingredient.unit}</td>
                      <td>{ingredient.name}</td>
                      <td>
                        <Button 
                          color="danger"
                          type="button"
                          onClick={() => this.props.removeIngredient(index)}
                        >-</Button>
                      </td>
                    </tr>
                  })}
                </tbody>
                </Table> : <div></div>}      
              <FormGroup row>
                  <Col sm={2}>
                    <Input name="newIngredientMeasure"
                      id="newIngredientMeasure"
                      type="text" 
                      onChange={(e) => this.props.handleInputChange(e)}
                      value={ this.props.state.newIngredientMeasure } />
                  </Col>
                  <Col sm={2}>
                    <Input name="newIngredientUnit"
                      type="select" 
                      id="newIngredientUnit"
                      onChange={(e) => this.props.handleInputChange(e)}
                      value={ this.props.state.newIngredientUnit }>
                        <option>oz</option>
                        <option>tbsp</option>
                        <option>tsp</option>
                        <option>dash</option>
                        <option>drops</option>
                        <option>each</option>
                        <option>piece</option>
                    </Input>
                  </Col>
                  <Col sm={6}>
                    <AsyncTypeahead 
                      name="newIngredientName"
                      id="newIngredientName"
                      isLoading={ this.props.state.isLoading }
                      labelKey="name"
                      onSearch={query => this.props.onItemSearch(query)}
                      onChange={(item) => this.props.handleATAchange(item)}
                      onInputChange={(input) => this.props.handleATAInputChange(input)}
                      selected={ this.props.state.selected }
                      value={ this.props.state.newIngredientName }
                      options={ this.props.state.options }
                      ref={(typeahead) => this.typeahead = typeahead} 
                    />
                  </Col>
                  <Col sm={2}>
                    <Button
                      color="primary"
                      type="button"
                      onClick={()=> this.props.addIngredient()}>
                      Add
                    </Button>
                  </Col>
                </FormGroup>
                { this.props.state.errors.measure && <div>{ this.props.state.errors.measure }</div>}
                { this.props.state.errors.ingredient && <div>{ this.props.state.errors.ingredient }</div>} 
            </div>
            <div className="mt-3">
              <p>Instructions:</p>
              <Table>
                <tbody>
                  { this.props.state.instructions.map((instruction, index) => {
                    return <tr key={ instruction }>
                      <td>{ index + 1 }</td>
                      <td>{ instruction }</td>
                      <td>
                        <Button 
                          color="danger"
                          type="button"
                          onClick={ () => this.props.removeInstruction(index) }
                        >-</Button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </Table>
              <FormGroup row>
                <Col sm={9}>
                  <Input 
                    name='newInstruction' 
                    id='newInstruction'
                    type="text"
                    onChange={ (e) => { this.props.handleInputChange(e) }}
                    value={ this.props.state.newInstruction } />
                </Col>
                <Button sm={3}
                  color="primary"
                  type="button"
                  onClick={ ()=> this.props.addInstruction() }>
                  Add Instruction
                </Button>
              </FormGroup>
              { this.props.state.errors.instruction && <div>{ this.props.state.errors.instruction }</div>}
            </div>
          </CardBody>
          <CardFooter>
            <div className="btn-group" style={{ margin: 'auto' }}>
              <Button color="primary" type="submit">
                Submit
              </Button>
              <Button color="secondary" type="button" onClick={()=> this.props.cancel()}>
                Cancel
              </Button>
            </div>
          </CardFooter>
        </Form>
        <Modal isOpen={ this.props.state.modal } toggle={ this.props.state.modalToggle } className="modal-dialog-centered">
          <Card style={ modalStyle }>
            <StockItemForm
              stockItem = {{ name: this.props.state.newIngredientName, description: '' }}
              handleFormSubmit={ this.props.handleIngModalReturn}
              cancel={ this.props.modalToggle}
            />         
          </Card>
        </Modal>   
      </Card>
    );
  }
}

export default RecipeFormDisplay;