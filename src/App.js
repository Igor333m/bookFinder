import React from 'react';
import './App.css';
import Item from './Item';

class App extends React.Component {

  state = {
    inputValue: '',
    showTotal: false,
    totalItems: '',
    items: []
  }

  handleChange = e => {
    this.setState({
      inputValue: e.target.value
    })
  }

  get = url => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", url) 
      xhr.onload = function() {
        // This is called even on 404 etc
        // so check the status
        if (xhr.status === 200) {
          // Resolve the promise with the response text
          resolve(xhr.response);
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(xhr.statusText));
        }
      };
  
      // Handle network errors
      xhr.onerror = function() {
        reject(Error("Network Error"));
      };
  
      // Make the request
      xhr.send();
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    // Handle empty submit
    if (this.state.inputValue) {
      this.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.inputValue}`)
        .then( response => {
          const { totalItems, items } = JSON.parse(response);
          console.log('totalItems: ', totalItems);
          console.log('items: ', items);
          this.setState({
            totalItems,
            items,
            showTotal: true
          });
        }, error => {
          console.log("error: ", error);
        } );
      console.log(this.state.inputValue);
    } else {
      this.setState({
        totalItems: '',
        items: [],
        showTotal: false
      });
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Book Finder</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Search.." name="search" />
            <button type="submit" value="Submit">Submit</button>
            <img src="https://books.google.com/googlebooks/images/poweredby.png" className="poweredbyGoogle" border="0" alt=""></img>
          </form>
          <div className="total">{this.state.showTotal && `Total items: ${this.state.totalItems}`}</div>
        </header>
        <main>
          {this.state.items.map( item => (
            <Item item={item} key={item.id}></Item>
          ))}
        </main>
      </div>
    );
  }
}

export default App;