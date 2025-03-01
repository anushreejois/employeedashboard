import { useEffect, useState } from "react";
import { getEmployees } from "../api/employeeApi";
import "../styles/EmployeeTable.css"; // Reusing EmployeeTable styles

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <div className="employee-list-container">
      <h2>Employee List</h2>
      {employees.length > 0 ? (
        <ul>
          {employees.map((emp) => (
            <li key={emp.id} className="employee-card">
              <strong>{emp.first_name} {emp.last_name}</strong>
              <p>Email: {emp.email}</p>
              <p>Phone: {emp.phone_number}</p>
              <p>Department: {emp.department}</p>
              <p>Salary: ₹{emp.salary}</p>
              <p>Joining Date: {emp.joining_date}</p>
              <p>Status: {emp.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
};

export default EmployeeList;

