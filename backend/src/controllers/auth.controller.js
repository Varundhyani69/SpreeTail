const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const pool = require("../config/connection.js");

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "All fields are required"
      });
    }

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: "Email already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `
      INSERT INTO users (
        id,
        name,
        email,
        password_hash
      )
      VALUES ($1,$2,$3,$4)
      `,
      [
        uuidv4(),
        name,
        email,
        hashedPassword
      ]
    );

    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
  register
};