import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create a connection pool to the database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to test the database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connected successfully");
    connection.release(); // Release the connection back to the pool
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1); // Exit the process with an error code
  }
};

// Call the test function
testConnection();

// Export the pool for use in other parts of the application
export default pool;
