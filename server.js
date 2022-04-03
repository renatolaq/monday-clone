const PORT = 8000 
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())

// --------------- Configuration Astra ------ -
const token = 'AstraCS:QlyvCHnACwjwZjUNbFgmuNuB:0915b21c569612fb7c4f79f2a3887cf598dd50863b25e138b8fdb28c5911e3b5'
const url = 'https://55104e31-6e0f-4718-97bd-b7e10bac6a43-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/tickets/collections/tasks'

// --------- Routes ------ 
// Add new Task
app.post('/tickets', async( req, res) => {
    const formData = req.body.formData

    const options = {
        method: 'POST', 
        headers: { 
            Accepts:  'application/json', 
            'X-Cassandra-Token': token, 
            'Content-Type': 'application/json'
        }, 
        data: formData
    }

    try { 
        const response = await axios(url, options)
        res.status(200).json(response.data)
    } catch (err){
        console.log(err)
        res.status(500).json({message: err})

    }
})

// ---- Get tasks ---- 
app.get('/tickets', async (req, res ) => {
    const options = {
        method: 'GET',
        headers: { 
            Accepts:  'application/json', 
            'X-Cassandra-Token': token
        }

    }
    try {
        const response = await axios(`${url}?page-size=20`, options)
        res.status(200).json(response.data)
    } catch (err){
        console.log(err)
        res.status(500).json({message: err})
    } 
})

// ---- Delete ---- 

app.delete('/tickets/:documentId', async (req, res) => {
    const id = req.params.documentId
    console.log('id', id)
    const options = {
        method:  'DELETE', 
        headers: { 
            Accepts:  'application/json', 
            'X-Cassandra-Token': token
        }
    }
    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
    } catch (err){
        console.log(err)
        res.status(500).json({message: err})
    } 

})


// -- Get one Ticket ---
app.get('/tickets/:documentId', async (req, res ) => {
    const id = req.params.documentId
    
    const options = {
        method:  'GET', 
        headers: { 
            Accepts:  'application/json', 
            'X-Cassandra-Token': token
        }
        
    }
    
    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
    } catch (err){
        console.log(err)
        res.status(500).json({message: err})
    } 

})



// -- Edit Ticket ---
app.put('/tickets/:documentId', async (req, res ) => {
    const id = req.params.documentId
    const data = req.body.data
    const options = {
        method:  'PUT', 
        headers: { 
            Accepts:  'application/json', 
            'X-Cassandra-Token': token
        }, 
        data
        
    }

    try {
        const response = await axios(`${url}/${id}`, options)
        res.status(200).json(response.data)
    } catch (err){
        console.log(err)
        res.status(500).json({message: err})
    } 

})


app.listen(PORT, () => console.log('Server running on port '+ PORT))