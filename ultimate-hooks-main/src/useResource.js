import axios from 'axios'
import { useEffect, useState } from 'react'

/*const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // ...

  const create = (resource) => {
    // ...
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
} */

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  useEffect(() => {
    getAll()
  },[])
  
  
  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    await getAll()
    return response.data
  }

  const service = {create}

  return [
    resources, service
  ]
}