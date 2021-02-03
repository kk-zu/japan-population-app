import axios from 'axios'

export default axios.create({
  baseURL: 'https://opendata.resas-portal.go.jp',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': process.env.REACT_APP_RESAS_API_KEY,
  },
})
