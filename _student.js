import express from "express";
import cors from "cors";
import pool from "./db.js"; // Make sure this uses the promise version of mysql2

const app = express();
app.use(express.json());
app.use(cors());

app.post("/student", async (req, res) => {
  const { studentID, studentName, course } = req.body;
  const presentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

  console.log("New student record:", req.body);
  console.log("Present date:", presentDate);

  try {
    // Check if the student already exists
    const query = "SELECT * FROM student WHERE studentID = ?";
    const [result] = await pool.query(query, [studentID]);

    if (result.length > 0) {
      return res.status(409).json({ message: "Student already exists" });
    }

    // Insert new student record
    console.log("Inserting new student record");
    const insertQuery = `
      INSERT INTO student (studentID, studentName, course, presentDate)
      VALUES (?, ?, ?, ?)
    `;
    await pool.query(insertQuery, [
      studentID,
      studentName,
      course,
      presentDate,
    ]);

    res.status(201).json({ message: "Student created successfully" });
  } catch (err) {
    console.error("Error during database operation:", err);
    res.status(500).json({ message: "Database error" });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
