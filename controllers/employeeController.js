const db = require("../db");

// GET all employees
exports.getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching employees:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ADD a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, department, salary, joining_date, status } = req.body;
    const query = "INSERT INTO employees (first_name, last_name, email, phone_number, department, salary, joining_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(query, [first_name, last_name, email, phone_number, department, salary, joining_date, status]);
    res.json({ message: "Employee added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error adding employee:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE an employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, phone_number, department, salary, joining_date, status } = req.body;
    const query = "UPDATE employees SET first_name=?, last_name=?, email=?, phone_number=?, department=?, salary=?, joining_date=?, status=? WHERE id=?";
    await db.query(query, [first_name, last_name, email, phone_number, department, salary, joining_date, status, id]);
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM employees WHERE id=?", [id]);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

