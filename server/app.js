const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: "https://newproj-mauve.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

async function getConnection() {
  return await mysql.createConnection({
    host: "coach-reservation-database.mysql.database.azure.com",
    user: "adminuser",
    password: "azure@#$12345",
    database: "train_reservation",
    ssl: {
      rejectUnauthorized: true,
    },
  });
}

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Train Reservation API" });
});

app.get("/api/reserved-seats", async (req, res) => {
  let connection;
  try {
    connection = await getConnection();
    const [rows] = await connection.query(
      "SELECT id FROM seats WHERE is_reserved = TRUE"
    );
    const reservedSeats = rows.map((row) => row.id);
    res.json(reservedSeats);
  } catch (error) {
    console.error("Error fetching reserved seats:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) connection.end();
  }
});

app.post("/api/reserve-seats", async (req, res) => {
  const { seatIds } = req.body;
  let connection;

  if (!seatIds || !Array.isArray(seatIds) || seatIds.length === 0) {
    return res.status(400).json({ error: "Invalid seat IDs" });
  }

  try {
    connection = await getConnection();
    await connection.beginTransaction();

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

    await connection.query(
      "UPDATE seats SET is_reserved = TRUE WHERE id IN (?)",
      [seatIds]
    );

    const reservationValues = seatIds.map((seatId) => [seatId]);
    await connection.query("INSERT INTO reservations (seat_id) VALUES ?", [
      reservationValues,
    ]);

    await connection.commit();
    res.json({ message: "Seats reserved successfully" });
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Error reserving seats:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (connection) connection.end();
  }
});

app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
