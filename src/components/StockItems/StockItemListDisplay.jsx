import React from 'react';
import {
  Button,
  Card, CardFooter, CardHeader,
  InputGroup, InputGroupAddon, Input,
  Table
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";

const styles = {
  list: {
    display: 'flex',
    margin: 'auto',
    marginTop: '20px',
    marginBottom: '20px'
  },

  header: {
    display: 'flex',
    margin: 'auto',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
}

const StockItemListDisplay = (props) => {
  return (
    <Card style={styles.list}>
      <CardHeader>
        <div style={styles.header}>
          <strong>Ingredients</strong>
        </div>
        <div style={styles.header}>
          <div style={{ paddingTop: '15px' }}>
            <Pagination
              activePage={props.state.activePage}
              itemsCountPerPage={props.state.itemsPerPage}
              totalItemsCount={props.stockItemList.total}
              pageRangeDisplayed={5}
              onChange={props.handlePageChange}
              itemClass='page-item'
              linkClass='page-link'
            />
          </div>
          <InputGroup className="ml-2">
            <Input
              name="searchBox"
              id="searchBox"
              onChange={props.handleInputChange}
              value={props.state.searchBox}
            />
            <InputGroupAddon addonType="append">
              <Button
                color="primary"
                type="button"
                onClick={props.handleSearchSubmit}
              >Search</Button>
            </InputGroupAddon>
          </InputGroup>
          {props.authenticated &&
            <Button
              className="ml-2"
              color="primary"
              onClick={() => props.history.push('/stockitems/create')}>
              Add Ingredient
            </Button>}
        </div>
      </CardHeader>
      {props.stockItemList.docs ?
        <Table striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.stockItemList.docs.map((item) => {
              const linkUrl = `/stockitems/${item._id}`;
              let desc = item.description;
              if (item.description.length > 80) {
                desc = item.description.slice(0, 79) + '...';
              }
              return <tr key={item._id}>
                <td><Link to={linkUrl}>{item.name}</Link></td>
                <td>{desc}</td>
              </tr>
            })}
          </tbody>
        </Table>
        : <span>loading...</span>}
      <CardFooter>
        <div style={styles.header}>
          <Button
            color="primary"
            onClick={() => props.history.push('/stockitems/create')}>
            Add Ingredient
          </Button>
          <Pagination
            activePage={props.state.activePage}
            itemsCountPerPage={props.state.itemsPerPage}
            totalItemsCount={props.stockItemList.total}
            pageRangeDisplayed={5}
            onChange={props.handlePageChange}
            itemClass='page-item'
            linkClass='page-link'
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default StockItemListDisplay;