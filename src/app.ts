import express from 'express'
import cors from 'cors'
import router from './router/router'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// user router common roter
app.use('/api/v1', router)

// cookie parser
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello chutiya ! kese hain ap log')
})

export default app
