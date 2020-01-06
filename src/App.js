import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    inputValue: ''
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
        if (xhr.status == 200) {
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
    this.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.inputValue}`)
      .then( response => {
        console.log("response: ", response);
      }, error => {
        console.log("error: ", error);
      } );
    console.log(this.state.inputValue);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Book Finder</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Search.." name="search" />
            <button type="submit" value="Submit">Submit</button>
          </form>
        </header>
        <main>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>

        </main>
      </div>
    );
  }
}

export default App;