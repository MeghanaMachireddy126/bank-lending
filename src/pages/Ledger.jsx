// src/pages/Ledger.jsx
import { useState } from "react";
import { api } from "../api";
import "./pages.css";

export default function Ledger() {
  const [loanId, setLoanId] = useState("");
  const [ledger, setLedger] = useState(null);
  const [error, setError] = useState("");

  const fetchLedger = async (e) => {
    e.preventDefault();
    setError("");
    setLedger(null);

    try {
      const data = await api.getLedger(loanId);
      setLedger(data);
    } catch (err) {
      setError(err.message || "Failed to fetch ledger or loan not found.");
    }
  };

  return (
    <div className="page">
      <h1>Loan Ledger</h1>
      <form onSubmit={fetchLedger} className="form">
        <input
          type="text"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
          placeholder="Enter Loan ID"
          required
        />
        <button type="submit">View Ledger</button>
      </form>

      {error && <p className="error">{error}</p>}

      {ledger && (
        <div className="ledger-card">
          <h2>Loan ID: {ledger.loan_id}</h2>
          <p>
            <strong>Customer ID:</strong> {ledger.customer_id}
          </p>
          <p>
            <strong>Principal:</strong> {ledger.principal}
          </p>
          <p>
            <strong>Total Amount:</strong> {ledger.total_amount}
          </p>
          <p>
            <strong>Amount Paid:</strong> {ledger.amount_paid}
          </p>
          <p>
            <strong>Balance:</strong> {ledger.balance_amount}
          </p>
          <p>
            <strong>EMIs Left:</strong> {ledger.emis_left}
          </p>

          <h3>Transactions</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {ledger.transactions?.length > 0 ? (
                ledger.transactions.map((t) => (
                  <tr key={t.payment_id}>
                    <td>{t.payment_id}</td>
                    <td>{new Date(t.payment_date).toLocaleDateString()}</td>
                    <td>{t.amount}</td>
                    <td>{t.payment_type}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
