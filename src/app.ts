import express from 'express'
import cors from 'cors'
import router from './router/router'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// user router common roter
app.use('/api/v1', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app
