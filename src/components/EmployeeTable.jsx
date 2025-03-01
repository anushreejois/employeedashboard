import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import "../styles/EmployeeTable.css";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees(); 
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-table-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.first_name} {emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone_number}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              <td>{emp.joining_date}</td>
              <td>{emp.status}</td>
              <td>
                <button onClick={() => navigate(`/employee/${emp.id}`)}>Edit</button>
                <button onClick={() => handleDelete(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;

