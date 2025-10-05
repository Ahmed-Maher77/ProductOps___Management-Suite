const pool = require("./db");

const connectDB = async () => {
    try {
        // Ping the pool to ensure a connection can be acquired
        await pool.query("SELECT 1");
        console.log("✅ MySQL connected successfully");
        return true;
    } catch (err) {
        console.error(`❌ Error connecting to MySQL: ${err.message}`);
        return false;
    }
};

module.exports = connectDB;
