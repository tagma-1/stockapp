import React, { Component } from 'react';
import Logo from './logo.svg';
import './App.css';
import StockInfo from './components/Stockinfo'
import { fetchStockQuote, fetchStockLogo, fetchStockNews, fetchPreviousMonth, fetchSixMonths } from './api/iex'
import './bootstrap-4.0.0-beta.2-dist/css/bootstrap.css'


class App extends Component {
  state={
    error: null,
    enteredSymbol: 'NFLX',
    quote: null,
    logo: null,
    news: null,
    priceHistory: null,
    sixMonthHistory: null,
    searchHistoryDisplay: false,
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
  };
  
  toggleSearchHistoryDisplay = () => {
    this.setState((previousState) => {
      const currentSearchHistoryDisplay = previousState.searchHistoryDisplay;
      return{
        searchHistoryDisplay: !currentSearchHistoryDisplay
      }
    })
  };
 
  loadQuote = () => {
    const { 
      enteredSymbol, 
      quoteHistory, 
      news, 
      priceHistory, 
      sixMonthHistory } = this.state;

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

    // Fetch the previous month's trading data
    fetchSixMonths(enteredSymbol)
      .then((prices) => {
        this.setState({ sixMonthHistory: prices });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          error = new Error(`The stock symbol '${enteredSymbol}' does not have historic price data available.`)
        } 
        this.setState({ error: error });
        console.log('Error loading logo', error);
      })  
      
    // Fetch the previous six months' trading data
    fetchPreviousMonth(enteredSymbol)
      .then((prices) => {
          this.setState({ priceHistory: prices });
        })
      .catch((error) => {
          if (error.response.status === 404) {
            error = new Error(`The stock symbol '${enteredSymbol}' does not have historic price data available.`)
          } 
          this.setState({ error: error });
          console.log('Error loading logo', error);
        })        
    };

  render() {
    const { 
      error, 
      enteredSymbol, 
      quote, 
      logo, 
      quoteHistory, 
      news, 
      priceHistory,
      sixMonthHistory,
      searchHistoryDisplay } = this.state; 

    return (
      <div className="App">
        {/* <div className="header1 row">
          <h4 className="offset-5">Built with</h4>
          <img src={Logo} className="App-logo" alt="react logo" />
        </div> */}
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
          <div className="text-right w-50">
            <p 
              className="small text-muted text-link"
              // Toggle boolean to display previous searches
              onClick={ (event) => {
                this.toggleSearchHistoryDisplay(); 
              }}
            >
              Your Searches
            </p>
            {
              !!searchHistoryDisplay ? ( 
                <ul className="search-history text-left">
                  { quoteHistory.map((object) => {
                    return <li className="small text-muted">{object.symbol} - {object.companyName}</li>
                  }) }
                </ul>
              ) : ( null )
            }
          </div>
          <br />
          {
            !!error &&
              <p>{ error.message }</p>
          } 
          {
            !!quote && !!news && !!logo && !!priceHistory && !!sixMonthHistory ? (
              <StockInfo
                { ...quote }
                logo={ logo }
                news={ news }
                priceHistory={ priceHistory }
                sixMonthHistory={ sixMonthHistory }
              />
            ) : (
              <p>Loading...</p>
            )
          } 
        </div>
      </div>
    );
  }
}

export default App;
