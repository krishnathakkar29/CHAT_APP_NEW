import express from 'express'
import userRouter from './routes/user.js'

const app = express()


const port = process.env.PORT || 8080

app.use("/user",userRouter)

app.listen(port,() => {
    console.log(`server is listening on port ${port}`);
})