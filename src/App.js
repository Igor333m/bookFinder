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

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.inputValue);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Hello</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.inputValue} onChange={this.handleChange} placeholder="Search.." name="search" />
            <button type="submit" value="Submit">Submit</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;