import express, { Router } from 'express'
import router from './route/route'

const app = express()

app.use(express.json())
app.use('/api/v1/',router)

app.listen(3001,() => {
    console.log("express server up")
})