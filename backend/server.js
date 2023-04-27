const app = require('./app');
const dbConn = require('./config/db');
const PORT = process.env.NODE_PORT || 5000;
dbConn(); //mongodb connection
app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`))