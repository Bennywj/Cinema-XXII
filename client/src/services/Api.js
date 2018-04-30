import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: 'https://cinema-xxii-server.herokuapp.com/'
    //baseURL: 'http://localhost:8081/'
  })
}
