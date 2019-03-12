import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';

import { connect } from 'react-redux';
import { getProductsBySales, getProductsByArrival } from '../../actions/products_actions';

class Home extends Component {

  componentDidMount(){
    this.props.dispatch(getProductsBySales());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
        
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);
