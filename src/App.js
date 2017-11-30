import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import StockInfo from './components/Stockinfo'
import { fetchStockQuote } from './api/iex'


class App extends Component {
  state={
    error: null,
    enteredSymbol: 'NFLX',
    quote: null
  };
  
  componentDidMount() {
    fetchStockQuote(this.state.enteredSymbol)
      .then((quote) => {
        this.setState({ quote: quote });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          error = new Error('The stock symbol does not exist.')
        } 
        this.setState({ error: error });
        console.log('Error loading quote', error);
      })
  };

  onChangeEnteredSymbol = ({ target }) => {
    const value = target.value.trim().toUpperCase()
    this.setState({ 
      enteredSymbol: value 
    })
  }

  render() {
    const { error, enteredSymbol, quote } = this.state; 

    return (
      <div className="App">
        <h1>Stock Price App</h1>

        <input 
          value={ enteredSymbol } 
          placeholder='Stock symbol e.g. NFLX' 
          aria-label='Stock symbol'
          onChange={ (event) => {
            this.onChangeEnteredSymbol(event);
          } } 
        />
        {
          !!error &&
            <p>{ error.message }</p>
        } 
        {
          !!quote ? (
            <StockInfo
              { ...quote }
            />
          ) : (
            <p>Loading...</p>
          )
        } 
      </div>
    );
  }
}

export default App;
