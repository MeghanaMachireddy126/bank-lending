// src/api.js
const API_BASE = "https://bank-lender-backend.onrender.com/api";

async function request(url, method = "GET", data) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (data) options.body = JSON.stringify(data);

  try {
    const response = await fetch(`${API_BASE}${url}`, options);
    if (!response.ok) {
      let errMsg = "API Error";
      try {
        const err = await response.json();
        errMsg = err.error || errMsg;
      } catch {
        errMsg = response.statusText || errMsg;
      }
      throw new Error(errMsg);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Request failed for ${url}:`, error.message);
    throw error;
  }
}

export const api = {
  // Customers
  getCustomers: () => request("/customers"),
  createCustomer: (data) => request("/customers", "POST", data),
  getCustomerOverview: (id) => request(`/customers/${id}/overview`),

  // Loans
  getLoans: () => request("/loans"),
  createLoan: (data) => request("/loans", "POST", data),

  // Payments
  getPayments: () => request("/payments"),
  createPayment: (loanId, data) =>
    request(`/loans/${loanId}/payments`, "POST", data),

  // Ledger
  getLedger: (loanId) => request(`/loans/${loanId}/ledger`),
};
