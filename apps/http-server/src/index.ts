import express, { Router } from 'express'
import router from './route/route'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1/',router)


app.listen(3001,() => {
    console.log("express server up")
})