// Defines Constructors
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Express to create a route for every file in the 'public' folder and give it a '/' route
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// file routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// App listener
app.listen(PORT, () => {
  console.log(`Server available at localhost:${PORT}`);
});