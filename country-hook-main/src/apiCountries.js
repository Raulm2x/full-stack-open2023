import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
    const request = await axios.get(`${baseUrl}/all`)
    return request.data
}

const getByName = async (name) => {
  const request = await axios.get(`${baseUrl}/name/${name}`)
  return request.data
}

export default {getAll, getByName}