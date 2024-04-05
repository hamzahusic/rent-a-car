const express = require("express");
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const carRoutes = require('./routes/carRoutes')

app.use(express.json());
app.use(cors());

const PORT = 8000;

app.use("/user",userRoutes);
app.use("/car",carRoutes);

app.listen(PORT, () => {
    console.log("Server is listening to port " + PORT)
})