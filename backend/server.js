const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const postsRoutes = require('./routes/postRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const connectDB = require('./config/db.js');
const cors = require('cors');

const port = process.env.PORT || 5000; 
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/posts', postsRoutes);
app.use('/users', userRoutes);

connectDB();

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('frontend', 'build')));

    app.get('*', (req, res) => res.sendFile(path.resolve('frontend', 'build', 'index.html')));
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server started on ${port}`));



// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));

//     app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'../', 'frontend', 'build', 'index.html')));
// } else {
//     app.get('/', (req, res) => res.send('Please set to production'));