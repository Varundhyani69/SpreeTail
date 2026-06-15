const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
const pool = require("./config/connection.js")
const authRoutes = require("./routes/auth.routes.js");
const groupRoutes = require("./routes/group.routes.js");
const expenseRoutes = require("./routes/expense.routes.js");
const importRoutes = require("./routes/import.routes.js");

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173"
  ]
}));


app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/expenses", expenseRoutes);
app.use(
  "/api/imports",
  importRoutes
);
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})
