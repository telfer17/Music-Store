import React, { Component } from 'react';
import Header from './components/header_footer.header';

class Layout extends Component {
  render(){
    return (
      <div>
        <Header/>
        <div className="page_container">
          {this.props.children}
        </div>
        FOOTER
      </div>
    );
  }
}

export default Layout;
