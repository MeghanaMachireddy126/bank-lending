import React, { useEffect, useState } from "react";
import "./pages.css";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");

  // Fetch all customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("https://bank-lender-backend.onrender.com/api/customers");
        if (!response.ok) throw new Error("Failed to fetch customers");
        const data = await response.json();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Add a new customer
  const addCustomer = async () => {
    if (!customerId || !name) {
      alert("Please enter Customer ID and Name");
      return;
    }

    try {
      const response = await fetch("https://bank-lender-backend.onrender.com/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_id: customerId, name }),
      });

      if (!response.ok) throw new Error("Failed to add customer");
      const newCustomer = await response.json();
      setCustomers((prev) => [newCustomer, ...prev]);
      setCustomerId("");
      setName("");
    } catch (err) {
      console.error("Error adding customer:", err);
      alert("Failed to add customer.");
    }
  };

  return (
    <div className="page p-6">
      <div className="card">
        <h1>Customers</h1>

        {/* Add Form */}
        <div className="form">
          <input
            type="text"
            placeholder="Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={addCustomer}>Add</button>
        </div>

        {/* Error Display */}
        {error && <p className="error">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p>Loading customers...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((c) => (
                  <tr key={c.customer_id}>
                    <td>{c.customer_id}</td>
                    <td>{c.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
