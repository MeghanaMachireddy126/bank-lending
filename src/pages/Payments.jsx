import React, { useEffect, useState } from "react";
import { api } from "../api";
import "./pages.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form states
  const [paymentId, setPaymentId] = useState("");
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentType, setPaymentType] = useState("EMI");

  // Fetch all payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await api.getPayments();
        setPayments(data || []);
      } catch (err) {
        setError("Failed to load payments.");
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  // Add new payment
  const createPayment = async () => {
    if (!paymentId || !loanId || !amount || !paymentType) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = {
      payment_id: paymentId,
      loan_id: loanId,
      amount: parseFloat(amount),
      payment_type: paymentType,
    };

    try {
      const newPayment = await api.createPayment(payload);
      if (newPayment) {
        setPayments((prev) => [newPayment, ...prev]);
        setPaymentId("");
        setLoanId("");
        setAmount("");
        setPaymentType("EMI");
      }
    } catch (err) {
      alert("Failed to record payment.");
    }
  };

  return (
    <div className="page">
      <h1>Payments</h1>

      {/* Add Payment Form */}
      <div className="form">
        <input
          type="text"
          placeholder="Payment ID"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Loan ID"
          value={loanId}
          onChange={(e) => setLoanId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="EMI">EMI</option>
          <option value="LUMP_SUM">LUMP_SUM</option>
        </select>
        <button onClick={createPayment}>Record Payment</button>
      </div>

      {/* Error */}
      {error && <p className="error">{error}</p>}

      {/* Payments Table */}
      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Loan ID</th>
              <th>Amount</th>
              <th>Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((p) => (
                <tr key={p.payment_id}>
                  <td>{p.payment_id}</td>
                  <td>{p.loan_id}</td>
                  <td>{p.amount}</td>
                  <td>{p.payment_type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No payments found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
