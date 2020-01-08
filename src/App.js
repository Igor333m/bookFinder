import React from 'react';
import './App.css';
import Item from './Item';
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  max-width: 900%;
  margin: 0 auto;
  flex: auto;
  flex-flow: row wrap;
  justify-content: center;
  align-content: flex-start;
`;

const TotalItems = styled.div`
  margin: 2rem;
`;

const PoweredbyGoogle = styled.img`
  border: 0;
  position: relative;
  top: 1.5rem;
`;

const SearchInput = styled.input`
  width: 35%;
  height: 5rem;
  /* border: solid; */
  font-size: larger;
  padding-left: 1rem;
  border: 2px solid #999;
  border-radius: 1rem 0 0 1rem;

  @media screen and (max-width: 1000px) {
    width: 75%;
  }

  @media screen and (max-width: 700px) {
    width: 60%;
  }
`;

const SubmitButton = styled.button`
  height: 5rem;
  width: 15%;
  border: 2px solid #999;
  background-color: green;
  color: whitesmoke;
  /* border: solid; */
  font-size: larger;
  padding-left: 1rem;
  border-radius: 0 1rem 1rem 0;

  &:hover {
    color: white;
    border-color: #777;
    cursor: pointer;
  }

  @media screen and (max-width: 1000px) {
    width: 15%;
  }

  @media screen and (max-width: 700px) {
    width: 30%;
  }

`;

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
      this.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${this.state.inputValue}&startIndex=11`)
        .then( response => {
          const { totalItems, items } = JSON.parse(response);
          console.log('response: ', response);
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
            <SearchInput type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Search.." name="search" />
            <SubmitButton type="submit" value="Submit">Submit</SubmitButton>
          </form>
          <PoweredbyGoogle src="https://books.google.com/googlebooks/images/poweredby.png" border="0" alt=""></PoweredbyGoogle>
          <TotalItems>{this.state.showTotal && `Total items: ${this.state.totalItems}`}</TotalItems>
        </header>
        <Main>
          { this.state.totalItems === 0 ?
            <div>No Results.</div> :
            this.state.items.map( item => (
            <Item item={item} key={item.id}></Item>
          ))}
        </Main>
      </div>
    );
  }
}

export default App;