const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ansluter till databasen (MongoDB)
mongoose.connect("mongodb://localhost:27017/cv").then(() => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.log("Error connecting to database", error);
});

// Mongoose Schema
const workExperienceSchema = new mongoose.Schema({
    companyname: { 
        type: String, 
        required: [true, "Du måste ange företagsnamn"] 
    },
    jobtitle: { 
        type: String, 
        required: [true, "Du måste ange jobbtitel"] 
    },
    location: { 
        type: String, 
        required: [true, "Du måste ange plats"]  
    },
    startdate: { 
        type: Date, 
        required: [true, "Du måste ange startdatum"]     
    },
    enddate: { 
        type: Date, 
        required: [true, "Du måste ange slutdatum"] 
    },
    description: { 
        type: String, 
        required: [true, "Du måste ange beskrivning"]    
    }
});

const WorkExperience = mongoose.model('WorkExperience', workExperienceSchema);

//Routes
app.get('/', (req, res) => {
  res.json({message: "welcome to this API"});
});

// Routes

// Hämtar alla arbetserfarenheter från databasen
app.get('/workexperiences', async (req, res) => {
    try {
      let result = await WorkExperience.find({});
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
// Lägger till en ny arbetserfarenhet som sparas till databasen
  app.post('/workexperiences', async (req, res) => {
    try {
      let result = await WorkExperience.create(req.body);
      return res.json(result);
    } catch (error) {
        return res.status(400).json(error);
    }
  });
  
// Uppdaterar en specifik arbetserfarenhet
app.put('/workexperiences/:id', async (req, res) => {
    try {
    const result = await WorkExperience.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!result) {
        return res.status(404).json({ message: "Work experience not found" });
    }
    res.json(result);
    } catch (error) {
    res.status(400).json(error);
    }
    });
  
// Ta bort en arbetserfarenhet från databasen
app.delete('/workexperiences/:id', async (req, res) => {
    try {
      const result = await WorkExperience.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).json({ message: "Work experience not found" });
      }
      res.json(result);
    } catch (error) {
      res.status(400).json(error);
    }
  });

// Startar servern
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});