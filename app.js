require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;
const mongodbURI = process.env.MONGODB_URI;

// Define the schema for your MongoDB collection
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: { type: String, required: true }
});
const User = mongoose.model('User', UserSchema);

// Connect to MongoDB database on Atlas
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));

// Middleware to parse request bodies
app.use(bodyParser.json());

// POST endpoint to add a username to the collection
app.post('/add-username', (req, res) => {
  const user = new User({ username: req.body.username });
  user.save()
    .then(() => res.send('Username added successfully'))
    .catch(err => res.status(400).send(err.message));
});

// get

app.get('/get-usernames', (req, res) => {
    User.find({})
      .then(users => {
        const usernames = users.map(user => user.username);
        res.json(usernames);
      })
      .catch(err => res.status(400).send(err.message));
  });

  
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
