require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const TodoRoutes = require("./routes/todoRoutes")
const cors = require("cors");

const app = express();
app.use(express.json()); 
app.use(cors());


app.use("/todo", TodoRoutes);




mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

// Sample route
app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
