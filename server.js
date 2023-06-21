import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

// app config
const app = express()
const port = process.env.PORT || 8000
const connection_url = "mongodb+srv://kamalyogi0134:p57j58lw1K134yQT@cluster0.m5ptopg.mongodb.net/?retryWrites=true&w=majority"


//middleware
app.use(express.json())
app.use(Cors())

//db config
mongoose
  .connect(connection_url, {
    dbName: 'tinderMern',
  })
  .then(() => {
    console.log('Connected to the MongoDB database');
  })
  .catch((error) => {
    console.error('Error connecting to the MongoDB database:', error);
  });



//api endpoint
app.get("/",(req,res)=>{
    res.send({message:true})
})

app.post('/tinder/cards',async(req,res)=>{
    const dbCard = req.body
    try {
      const data = await Cards.create(dbCard);
      res.status(201).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
})

app.get('/tinder/cards', async (req, res) => {
  try {
    const data = await Cards.find();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});



//server listener
app.listen(port,()=>{
    console.log('Server is up and running on port '+port)
})