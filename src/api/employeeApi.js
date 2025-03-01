const API_URL = "http://localhost:5001/api/employees";

export const getEmployees = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch employees");
    return await res.json();
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  }
};

export const getEmployeeById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch employee");
    return await res.json();
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

export const addEmployee = async (employee) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    if (!res.ok) throw new Error("Failed to add employee");
    return await res.json();
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const updateEmployee = async (id, employee) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(employee),
    });
    if (!res.ok) throw new Error("Failed to update employee");
    return await res.json();
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete employee");
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
