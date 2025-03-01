import { useState } from "react";
import { addEmployee } from "../api/employeeApi";
import { useNavigate } from "react-router-dom";
import "../styles/AddEmployee.css";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    department: "",
    salary: "",
    joining_date: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployee(employee);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="first_name" value={employee.first_name} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="last_name" value={employee.last_name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={employee.email} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="text" name="phone_number" value={employee.phone_number} onChange={handleChange} required />

        <label>Department:</label>
        <input type="text" name="department" value={employee.department} onChange={handleChange} required />

        <label>Salary:</label>
        <input type="number" name="salary" value={employee.salary} onChange={handleChange} required />

        <label>Joining Date:</label>
        <input type="date" name="joining_date" value={employee.joining_date} onChange={handleChange} required />

        <label>Status:</label>
        <select name="status" value={employee.status} onChange={handleChange} required>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
