const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Base route" });
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
