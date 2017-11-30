import React, { Component } from 'react';
import Logo from './logo.svg';
import './App.css';
import StockInfo from './components/Stockinfo'
import { fetchStockQuote, fetchStockLogo, fetchStockNews } from './api/iex'
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.css'


class App extends Component {
  state={
    error: null,
    enteredSymbol: 'NFLX',
    quote: null,
    logo: null,
    news: null,
    quoteHistory: []
  };
  
  componentDidMount() {
    this.loadQuote();
  };

  onChangeEnteredSymbol = ({ target }) => {
    const value = target.value.trim().toUpperCase()
    this.setState({ 
      enteredSymbol: value 
    })
  }

  loadQuote = () => {
    const { enteredSymbol, quoteHistory, news } = this.state;

    // Fetch the stock quote
    fetchStockQuote(enteredSymbol)
      .then((quote) => {
        this.setState({ 
          quote: quote,
          error: null,
          quoteHistory: [ ...quoteHistory, quote] 
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol}' does not exist.`)
        } 
        this.setState({ error: error });
        console.log('Error loading quote', error);
      })
    
    // Fetch the image logo url 
    fetchStockLogo(enteredSymbol)
      .then((logo) => {
        this.setState({ logo: logo.url });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol}' does not have a logo available.`)
        } 
        this.setState({ error: error });
        console.log('Error loading logo', error);
      })
    
      // Fetch the stock's five most recent news stories
      fetchStockNews(enteredSymbol)
        .then((stories) => {
          this.setState({ news: stories });
          console.log(stories);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            error = new Error(`The stock symbol '${enteredSymbol}' does not have any news stories available.`)
          } 
          this.setState({ error: error });
          console.log('Error loading logo', error);
        })
  };

  render() {
    const { error, enteredSymbol, quote, logo, quoteHistory, news } = this.state; 

    return (
      <div className="App">
        <div className="header1 row">
          <h4 className="offset-5">Built with</h4>
          <img src={Logo} alt="react logo" />
        </div>
        <br />
        <div className="container" align="center">
          <br />
          <h1>Stock Price Look-Up</h1>
          <br />
          <div className="input-group w-50">
            <input 
              className="form-control"
              value={ enteredSymbol } 
              placeholder='Stock symbol e.g. NFLX' 
              aria-label='Stock symbol'
              onChange={ (event) => {
                this.onChangeEnteredSymbol(event);
              } } 
            />
            <button 
              className="btn btn-md btn-primary"
              onClick={ (event) => {
                this.loadQuote();
              } }
            >
              Go! 
            </button>
          </div>
          <br />
          {
            !!error &&
              <p>{ error.message }</p>
          } 
          {
            !!quote && !!news && !!logo ? (
              <StockInfo
                { ...quote }
                logo={ logo }
                news={ news }
              />
            ) : (
              <p>Loading...</p>
            )
          } 
          <h3>Your Previous Searches</h3>
          <ul>
            { quoteHistory.map((object) => {
              return <li>{object.symbol} - {object.companyName}</li>
            }) }
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
