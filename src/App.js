import React from 'react';
import './App.css';
import Item from './Item';
import styled from 'styled-components';
import NProgres from 'nprogress';

const Container = styled.div`
  text-align: center;
`;

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

const ClearSearchButton = styled.a`
  border: 0;
  right: 4rem;
  position: relative;
  background-color: transparent;
  font-size: 2rem;
  font-weight: 400;
  top: 0.2rem;
  color: grey;

  &:hover {
    color: darkgrey;
    cursor: pointer;
  }
`;

const SubmitButton = styled.button`
  height: 5rem;
  width: 15%;
  border: 2px solid #999;
  background-color: #295667;
  color: whitesmoke;
  font-size: larger;
  padding-left: 1rem;
  border-radius: 0 1rem 1rem 0;
  margin-left: -1.5rem;

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

const PaginationButton = styled.button`
  margin: 3rem 0 5rem 0;
  padding: 1rem 6rem;
  &.first {
    border-radius: 1rem 0 0 1rem;
  }
  &.last {
    border-radius: 0 1rem 1rem 0;
  }
`;

const NoResults = styled.p`
  color: #333;
  font-weight: 500;
`;

class App extends React.Component {

  state = {
    inputValue: '',
    showTotal: false,
    totalItems: '',
    items: [],
    currentPage: null,
    startIndex: 0,
    noResults: false
  }

  scrollToTop = () => {
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth'
    });
  }

  handleChange = e => {
    this.setState({
      inputValue: e.target.value,
      noResults: false
    })
  }

  clearSearch = e => {
    e.preventDefault();
    this.setState({
      inputValue: '',
      totalItems: '',
      items: [],
      showTotal: false,
      currentPage: null,
      startIndex: 0
    });
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
      // NProgress loading bar
      NProgres.start();
      this.get(`https://www.googleapis.com/books/v1/volumes?q=:${this.state.inputValue}`)
        .then( response => {
          NProgres.done();
          const { totalItems, items } = JSON.parse(response);
          console.log('totalItems: ', totalItems);
          if (items) {
            this.setState({
              totalItems,
              items,
              showTotal: true,
              currentPage: 1
            });
          } else {
            // Clear previous state if no results
            this.setState({
              noResults: true,
              totalItems: '',
              items: [],
              showTotal: false,
              currentPage: null,
              startIndex: 0
            });
          }
        }, error => {
          NProgres.done();
          console.log("error: ", error);
        } );
      console.log(this.state.inputValue);
    } else {
      this.clearSearch(e);
    }
  }

  paginationPrev = () => {
    this.scrollToTop();
    NProgres.start();
    this.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${this.state.inputValue}"&startIndex=${this.state.startIndex - 10}`)
        .then( response => {
          NProgres.done();
          const { totalItems, items } = JSON.parse(response);
          console.log('get ${this.state.startIndex}: ', this.state.startIndex);
          console.log('totalItems: ', totalItems);
          console.log('items: ', items);
          this.setState({
            totalItems,
            items,
            currentPage: this.state.currentPage - 1,
            startIndex: this.state.startIndex - 10
          });
        }, error => {
          NProgres.done();
          console.log("paginationNext / error: ", error);
        } );
  }

  paginationNext = () => {
    this.scrollToTop();
    NProgres.start();
    this.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:"${this.state.inputValue}"&startIndex=${this.state.startIndex + 10}`)
      .then( response => {
        NProgres.done();
        const { totalItems, items } = JSON.parse(response);
        console.log('get ${this.state.startIndex}: ', this.state.startIndex);
        console.log('totalItems: ', totalItems);
        console.log('items: ', items);
        if (items) {
          this.setState({
            totalItems,
            items,
            currentPage: this.state.currentPage + 1,
            startIndex: this.state.startIndex + 10
          });
        } else {
          alert("Something went wrong! Please try again!");
        }
      }, error => {
        NProgres.done();
        console.log("paginationNext / error: ", error);
      });
  }

  render() {
    // Hides the clear search button
    const visibilityHidden = { visibility: !this.state.inputValue ? 'hidden' : 'visible'};

    return (
      <Container>
        <header>
          <h1>BOOK FINDER</h1>
          <form onSubmit={this.handleSubmit}>
            <SearchInput type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Search.." name="search" tabIndex="1"/>
            <ClearSearchButton onClick={this.clearSearch} onKeyPress={e => e.charCode === 13 && this.clearSearch(e)} style={visibilityHidden} tabIndex="3" title="Clear Search">X</ClearSearchButton>
            <SubmitButton type="submit" value="Submit" tabIndex="2">Submit</SubmitButton>
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
        {this.state.noResults && this.state.inputValue && <NoResults>We couldn’t find any repositories matching '{this.state.inputValue}'</NoResults>}
        {this.state.showTotal && <PaginationButton className="first" onClick={this.paginationPrev} disabled={this.state.startIndex <= 0}>Prev</PaginationButton>}
        {this.state.showTotal && <PaginationButton className="last" onClick={this.paginationNext} disabled={this.state.items.length < 10 || this.state.startIndex + 10 >= this.state.totalItems}>Next</PaginationButton>}
      </Container>
    );
  }
}

export default App;