import React, { Component } from 'react';
import PageTop from '../utils/page_top';

import { connect } from 'react-redux';
import { getBrands, getTypes } from '../../actions/products_actions';

import CollapseCheckbox from '../utils/collapseCheckbox';

class Shop extends Component {

  componentDidMount(){
    this.props.dispatch(getBrands());
    this.props.dispatch(getTypes());
  }

  handleFilters = (filters, category) => {

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
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState={true}
                title="Types"
                list={products.types}
                handleFilters={(filters) => this.handleFilters(filters, 'type')}
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
