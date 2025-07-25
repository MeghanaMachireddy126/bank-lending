import React, { useState } from "react";
import { api } from "../api";
import "./pages.css";

export default function CustomerOverview() {
  const [customerId, setCustomerId] = useState("");
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");

  const fetchOverview = async (e) => {
    e.preventDefault();
    setError("");
    setOverview(null);

    try {
      const data = await api.getCustomerOverview(customerId);
      setOverview(data);
    } catch (err) {
      setError("Failed to fetch overview. Check the Customer ID.");
    }
  };

  return (
    <div className="page">
      <h1>Customer Overview</h1>

      {/* Search Form */}
      <form onSubmit={fetchOverview} className="form">
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <button type="submit">View Overview</button>
      </form>

      {error && <p className="error">{error}</p>}

      {overview && (
        <div className="overview-card">
          <h2>Customer ID: {overview.customer_id}</h2>
          <p><strong>Total Loans:</strong> {overview.total_loans}</p>

          <h3>Loans</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Principal</th>
                <th>Total Amount</th>
                <th>Interest</th>
                <th>EMI</th>
                <th>Paid</th>
                <th>EMIs Left</th>
              </tr>
            </thead>
            <tbody>
              {overview.loans.length > 0 ? (
                overview.loans.map((loan) => (
                  <tr key={loan.loan_id}>
                    <td>{loan.loan_id}</td>
                    <td>{loan.principal}</td>
                    <td>{loan.total_amount}</td>
                    <td>{loan.total_interest}</td>
                    <td>{loan.emi_amount}</td>
                    <td>{loan.amount_paid}</td>
                    <td>{loan.emis_left}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No loans found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
