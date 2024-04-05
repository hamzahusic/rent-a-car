const express = require("express");
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')

app.use(express.json());
app.use(cors());

const PORT = 8000;

app.use("/user",userRoutes);

app.listen(PORT, () => {
    console.log("Server is listening to port " + PORT)
})