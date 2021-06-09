const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();
app.use(express.json());


app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server start on port ${PORT}`))