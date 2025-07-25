import React, { useEffect, useState } from "react";
import { api } from "../api"; // Ensure api.js has getLoans & createLoan
import "./pages.css";

export default function Loans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [customerId, setCustomerId] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPeriodYears, setLoanPeriodYears] = useState("");
  const [interestRateYearly, setInterestRateYearly] = useState("");

  // Fetch all loans
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const data = await api.getLoans();
        setLoans(data || []);
      } catch (err) {
        setError("Failed to load loans.");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  // Add new loan
  const createLoan = async () => {
    if (!customerId || !loanAmount || !loanPeriodYears || !interestRateYearly) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      customer_id: customerId,
      loan_amount: parseFloat(loanAmount),
      loan_period_years: parseInt(loanPeriodYears, 10),
      interest_rate_yearly: parseFloat(interestRateYearly),
    };

    try {
      const newLoan = await api.createLoan(payload);
      if (newLoan) {
        setLoans((prev) => [newLoan, ...prev]);
        setCustomerId("");
        setLoanAmount("");
        setLoanPeriodYears("");
        setInterestRateYearly("");
      }
    } catch (err) {
      alert("Failed to create loan.");
    }
  };

  return (
    <div className="page">
      <h1>Loans</h1>

      {/* Add Loan Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Loan Period (years)"
          value={loanPeriodYears}
          onChange={(e) => setLoanPeriodYears(e.target.value)}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRateYearly}
          onChange={(e) => setInterestRateYearly(e.target.value)}
        />
        <button onClick={createLoan}>Create Loan</button>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Loans Table */}
      {loading ? (
        <p>Loading loans...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Customer ID</th>
              <th>Total Amount Payable</th>
              <th>Monthly EMI</th>
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr key={loan.loan_id}>
                  <td>{loan.loan_id}</td>
                  <td>{loan.customer_id}</td>
                  <td>{loan.total_amount_payable || loan.total_amount}</td>
                  <td>{loan.monthly_emi}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No loans found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
