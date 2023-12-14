const express=require("express")
const app=express()
const cors=require('cors')
const { connection } = require("./db")
const { taskRouter } = require("./route/taskRouter")
app.use(express.json())
app.use(cors())
require('dotenv').config()
const port=process.env.port||8000

app.use("/task",taskRouter)
app.listen(port,async()=>{
    try {
        await connection;
 
        console.log('server in running at port:',port)
    } catch (error) {
        console.log('Error connecting in database')
     
    }
})