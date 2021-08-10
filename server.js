const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    return res.send('Hello World')
})

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})