const express = require("express");
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const carRoutes = require('./routes/carRoutes');
const bodyParser = require("body-parser");
const categoryRoutes = require("./routes/categoryRoutes")

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

const PORT = 8000;

app.use("/user",userRoutes);
app.use("/car",carRoutes);
app.use("/category",categoryRoutes)

app.listen(PORT, () => {
    console.log("Server is listening to port " + PORT)
})