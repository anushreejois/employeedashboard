import { useState, useEffect } from "react";
import { getEmployees } from "../api/employeeApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from "recharts";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [salaryData, setSalaryData] = useState([]);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        processChartData(data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployees();
  }, []); // Empty dependency array, fetchEmployees is now within useEffect

  const processChartData = (data) => {
    const departmentCount = {};
    const statusCount = { Active: 0, Inactive: 0 };
    const salaryTrends = [];

    data.forEach((emp) => {
      departmentCount[emp.department] = (departmentCount[emp.department] || 0) + 1;
      statusCount[emp.status]++;

      salaryTrends.push({ joining_date: emp.joining_date, salary: emp.salary });
    });

    setDepartmentData(Object.keys(departmentCount).map((key) => ({ department: key, count: departmentCount[key] })));
    setStatusData(Object.keys(statusCount).map((key) => ({ status: key, count: statusCount[key] })));
    setSalaryData(salaryTrends);
  };

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>

      <div className="chart-container">
        {/* Department-wise Employee Count (Bar Chart) */}
        <div className="chart">
          <h3>Employees Per Department</h3>
          <BarChart width={400} height={300} data={departmentData}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Employee Status (Pie Chart) */}
        <div className="chart">
          <h3>Employee Status Distribution</h3>
          <PieChart width={300} height={300}>
            <Pie data={statusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100} label>
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Salary Trends (Line Chart) */}
        <div className="chart">
          <h3>Salary Trends Over Time</h3>
          <LineChart width={500} height={300} data={salaryData}>
            <XAxis dataKey="joining_date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="salary" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


