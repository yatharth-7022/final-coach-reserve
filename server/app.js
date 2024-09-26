const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "yatharth7112002",
  database: "train_reservation",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Train Reservation API" });
});

// Get all reserved seats
app.get("/api/reserved-seats", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id FROM seats WHERE is_reserved = TRUE"
    );
    const reservedSeats = rows.map((row) => row.id);
    res.json(reservedSeats);
  } catch (error) {
    console.error("Error fetching reserved seats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Reserve seats
app.post("/api/reserve-seats", async (req, res) => {
  const { seatIds } = req.body;

  if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
    return res.status(400).json({ error: "Invalid seat IDs" });
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Check if seats are available
    const [reservedSeats] = await connection.query(
      "SELECT id FROM seats WHERE id IN (?) AND is_reserved = TRUE",
      [seatIds]
    );

    if (reservedSeats.length > 0) {
      await connection.rollback();
      return res
        .status(400)
        .json({ error: "One or more selected seats are already reserved" });
    }

    // Reserve seats
    await connection.query(
      "UPDATE seats SET is_reserved = TRUE WHERE id IN (?)",
      [seatIds]
    );

    // Create reservation records
    const reservationValues = seatIds.map((seatId) => [seatId]);
    await connection.query("INSERT INTO reservations (seat_id) VALUES ?", [
      reservationValues,
    ]);

    await connection.commit();
    res.json({ message: "Seats reserved successfully" });
  } catch (error) {
    await connection.rollback();
    console.error("Error reserving seats:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    connection.release();
  }
});

// Catch-all route for undefined API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
