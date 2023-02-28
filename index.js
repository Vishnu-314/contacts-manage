const connectToMongo = require("./db");
const express=require('express')
const app=express()
const port=5000;

const cors=require('cors')
app.use(cors());

connectToMongo();

app.use(express.json())
const contactRouter=require('./routes/contacts')


app.use('/api',contactRouter)

app.get('/',(req,res)=>{
    res.send('Welcome to Contacts-Management')
})

app.listen(port,()=>{
    console.log('contacts management backend started successfully')
})