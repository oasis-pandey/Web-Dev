import express from 'express';
import dotenv from "dotenv"
import mongoose from 'mongoose';
import Item from "./models/Item.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("MongoDB connected.")
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err)=>{
        console.error("MondoDB connection failed", err);
    })

app.get("/", (req,res)=>{
    res.send("API is working.")
})

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find(); // fetch all documents from the items collection
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Could not fetch items" });
  }
});

app.get('/items/:id', async (req, res) => {
  try {
    const id = req.params.id; // extract id from URL
    const item = await Item.findOne({ _id: req.params.id });


    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error);
    res.status(500).json({ error: 'Invalid ID or server error' });
  }
});

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Update failed' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Delete failed' });
  }
});


app.post("/items",async (req,res) =>{
    try {
        const newItem = await Item.create(req.body);
        res.status(201).json(newItem)
    } catch (error) {
        console.error("Error creating item:", error)
        res.status(500).json({error:"Something went wrong"})
    }
})

