const axios = require('axios'); 

const express = require('express')
const cors = require('cors');
const { response } = require('express');
const app = express()


require('dotenv').config()

app.use(express.static('build'))


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }


app.use(requestLogger)

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

app.get('/auth', (request, res) => {

  const authUrl = `https://api.petfinder.com/v2/oauth2/token`;

  axios.post(authUrl, {
    grant_type: 'client_credentials',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }).then(function (apiResponse) {
    console.log(apiResponse)
    return res.json(apiResponse.data)
  })

})

  


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});