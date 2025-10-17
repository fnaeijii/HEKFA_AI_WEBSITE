const express = require('express');
const app = express();
// Define a route
app.get('/', (req, res) => {
   res.send('Hello, Node.js is running on this server!');
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});