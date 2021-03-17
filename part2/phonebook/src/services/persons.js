import axios from 'axios'
const baseUrl = `http://localhost:3001/persons`

const getAll = () => {
    return axios.get(baseUrl)
}

const create = personObject => {
    return axios.post(baseUrl, personObject)
}

const update = (id, changedNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, changedNumber)
    return request.then(response => response.data)/* .catch(error => {
        console.log('fail')
      }) */
}

export default {getAll, create, update}