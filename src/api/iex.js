import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.iextrading.com/1.0'
})

export function fetchStockQuote(symbol) {
  return api.get(`/stock/${symbol}/quote`)
    .then((res) => res.data)
}

export function fetchStockLogo(symbol) {
  return api.get(`/stock/${symbol}/logo`)
    .then((res) => res.data)
}

export function fetchStockNews(symbol) {
  return api.get(`/stock/${symbol}/news/last/4`)
    .then((res) => res.data)
}

export function fetchPreviousMonth(symbol) {
  return api.get(`/stock/${symbol}/chart/1m`)
    .then((res) => res.data)
}

