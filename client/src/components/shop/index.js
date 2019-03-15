import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { price } from '../utils/form/fixed_categories';

import { connect } from 'react-redux';
import { getBrands, getTypes } from '../../actions/products_actions';

import CollapseCheckbox from '../utils/collapseCheckbox';
import CollapseRadio from '../utils/collapseRadio';

class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      types: [],
      price: []
    }
  }

  componentDidMount(){
    this.props.dispatch(getBrands());
    this.props.dispatch(getTypes());
  }

  handlePrice = (value) => {
    const data = price;
    let array = [];

    for(let key in data){
      if(data[key]._id === parseInt(value, 10)){
        array = data[key].array
      }
    }
    return array;
  }

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters}
    newFilters[category] = filters;

    if(category === "price"){
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues
    }

    this.setState({
      filters: newFilters
    })
  }

  render(){
    const products = this.props.products;
    return (
      <div>
        <PageTop
          title="Browse Products"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Types"
                list={products.types}
                handleFilters={(filters) => this.handleFilters(filters, 'type')}
              />
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">
              Right
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Shop);
