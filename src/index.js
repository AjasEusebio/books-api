const express = require('express')
const v1BookRouter = require('./v1/routes/bookRoutes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/v1/books', v1BookRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
