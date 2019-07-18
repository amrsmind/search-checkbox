import React, { Fragment } from 'react';

import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import produce from 'immer';
import { RaceOperator } from 'rxjs/internal/observable/race';
import { filter } from 'rsvp';


let goods = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

class FilterableProductTable extends React.Component {
  constructor(props){
    super(props);
    this.goods = goods;
    this.state = {
      stocked:false,
      filtertext:''
    };
    this.handlesearch = this.handlesearch.bind(this);
    this.handlecheck = this.handlecheck.bind(this);
  }

  handlesearch(e){
    const value = e.target.value;
    this.setState({
        filtertext:value
    });
  }

  handlecheck(e){
      const checked = e.target.checked;
      e.target.checked = checked;
      this.setState({
         stocked:checked
      });

  }

  render() {
    let rowresultsearch = [];
    let rowresultchecked = [];
    let tempresults = [];
    const stocked = this.state.stocked;
    const filtertext = this.state.filtertext;
    let filtered = filtertext!=='';
    if(stocked){
      this.goods.forEach(product => {
        if (product.stocked)
             rowresultchecked.push(product);
    })
  }
    if(filtered)
    {
      tempresults = stocked?rowresultchecked:this.goods;
      tempresults.forEach(product =>{
        //alert(String.upperCase(product.name));
        if(product.name.toUpperCase().includes(filtertext.toUpperCase()))
           rowresultsearch.push(product);
      })
    }
    const results = filtered?rowresultsearch:stocked?rowresultchecked:this.goods;

    return (
      <div>
        <SearchBar
        checkvalue={stocked}
        searchvalue={filtertext}
        onSearch={this.handlesearch}
         onCheck={this.handlecheck} />
        <ProductTable goods={results} />
      </div>
    )

  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input
        onChange={this.props.onSearch}
        value={this.props.searchvalue}
        type="text" placeholder="search..." />
        <p>
          <input
          onChange={this.props.onCheck} type="checkbox" />
          {'  '}
          only show products in stock
           </p>
      </form>

    );
  }
}

class ProductTable extends React.Component {
  render() {
    const goods = this.props.goods;
    let lastCatergory = '';
    let rows = [];

    goods.forEach(product => {
      if (product.category !== lastCatergory) {
        rows.push(<ProductCategoryRow name={product.category} />);
      }
      rows.push(<ProductRow name={product.name} price={product.price} />);
      lastCatergory = product.category;
    })

    return (
      <table>
        <ProductRow name='name' price='price' />
        {rows}
      </table>
    );
  }
}


class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <th>{this.props.name}</th>
        <th></th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {

  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.price}</td>
      </tr>
    );
  }
}

// {
//   <table>
//   <tr>
//     <th>Name</th>
//     <th>price</th>
//   </tr>
//   <tr>
//     <th>sporting goods</th>
//     <th></th>
//   </tr>
//   <tr>
//     <td>Football</td>
//     <td>49$</td>
//   </tr>
// </table>
// }

ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
