require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db')
const port = process.env.PORT || 8083;

const userRoutes = require("./routes/userRoutes");
const tokenVerification = require("./middleware/tokenVerification")

connection()

app.get("/api/users/me", tokenVerification)

app.use(express.json())
app.use(cors())


app.use("/api/users", userRoutes)


app.listen(port, () => console.log('Port: ' + port));




