
# 🏦 Bank Lending System — Assignment

A full-stack web application that simulates a simplified **Bank Lending System** where customers can take loans, make EMI/lump-sum payments, and view their transaction history and ledger. This project demonstrates structured backend design, RESTful API development, and a clean React-based frontend UI.

---

## 🚀 Live Demo

- **Frontend (Vercel)**: [https://bank-lending-frontend.vercel.app](https://bank-lending-frontend.vercel.app)
- **Backend (Render)**: [https://bank-lending-backend.onrender.com](https://bank-lending-backend.onrender.com)

---

## 🧠 System Architecture

A simple **three-tier architecture**:

- **Frontend (React.js)**: A single-page application to interact with users.
- **Backend (Node.js + Express)**: Exposes RESTful APIs and handles business logic.
- **Database (PostgreSQL)**: Relational SQL database for structured financial data.

---

## 📦 Technology Stack

| Layer            | Tech Used                |
|------------------|--------------------------|
| **Frontend**     | React.js, CSS            |
| **Backend**      | Node.js, Express.js      |
| **Database**     | PostgreSQL (or SQLite)   |
| **Deployment**   | Vercel (frontend), Render (backend) |
| **Others**       | CORS, dotenv, pg, UUID   |

---

## 🧩 Features

- 📋 **Create & View Customers**
- 💰 **Apply for Loans with Simple Interest**
- 💳 **Make EMI or Lump Sum Payments**
- 📒 **View Loan Ledger (EMI tracker + History)**
- 📊 **Account Overview per Customer**

---

## 🔌 API Reference (`/api/v1`)

### ➕ LEND: Create New Loan

- **POST** `/loans`
```json
{
  "customer_id": "CUST123",
  "loan_amount": 50000,
  "loan_period_years": 2,
  "interest_rate_yearly": 10
}
```
- **Response**
```json
{
  "loan_id": "LOAN123",
  "customer_id": "CUST123",
  "total_amount_payable": 60000,
  "monthly_emi": 2500
}
```

---

### 💸 PAYMENT: Make a Payment

- **POST** `/loans/{loan_id}/payments`
```json
{
  "amount": 2500,
  "payment_type": "EMI"
}
```
- **Response**
```json
{
  "payment_id": "PAY123",
  "message": "Payment recorded successfully.",
  "remaining_balance": 57500,
  "emis_left": 23
}
```

---

### 📑 LEDGER: View Loan Details

- **GET** `/loans/{loan_id}/ledger`
- **Response**
```json
{
  "loan_id": "LOAN123",
  "customer_id": "CUST123",
  "principal": 50000,
  "total_amount": 60000,
  "monthly_emi": 2500,
  "amount_paid": 2500,
  "balance_amount": 57500,
  "emis_left": 23,
  "transactions": [
    {
      "transaction_id": "TXN001",
      "date": "2025-07-25T10:00:00Z",
      "amount": 2500,
      "type": "EMI"
    }
  ]
}
```

---

### 📂 ACCOUNT OVERVIEW

- **GET** `/customers/{customer_id}/overview`
- **Response**
```json
{
  "customer_id": "CUST123",
  "total_loans": 2,
  "loans": [
    {
      "loan_id": "LOAN123",
      "principal": 50000,
      "total_amount": 60000,
      "total_interest": 10000,
      "emi_amount": 2500,
      "amount_paid": 2500,
      "emis_left": 23
    }
  ]
}
```

---

## 🗄️ Database Schema

### `Customers`
| Column       | Type     | Description              |
|--------------|----------|--------------------------|
| customer_id  | TEXT     | Primary key              |
| name         | TEXT     | Customer name            |
| created_at   | TIMESTAMP| Default current time     |

### `Loans`
| Column            | Type     | Description                          |
|-------------------|----------|--------------------------------------|
| loan_id           | TEXT     | Primary key                          |
| customer_id       | TEXT     | FK → Customers.customer_id           |
| principal_amount  | DECIMAL  | Original amount borrowed             |
| total_amount      | DECIMAL  | Total with interest                  |
| interest_rate     | DECIMAL  | Simple interest rate                 |
| loan_period_years | INTEGER  | Duration in years                    |
| monthly_emi       | DECIMAL  | Fixed monthly EMI                    |
| status            | TEXT     | `ACTIVE`, `PAID_OFF`                 |
| created_at        | TIMESTAMP| Timestamp of loan creation           |

### `Payments`
| Column        | Type     | Description                     |
|---------------|----------|---------------------------------|
| payment_id    | TEXT     | Primary key                     |
| loan_id       | TEXT     | FK → Loans.loan_id              |
| amount        | DECIMAL  | Amount paid                     |
| payment_type  | TEXT     | `EMI` or `LUMP_SUM`             |
| payment_date  | TIMESTAMP| Timestamp of payment            |

---

## 📈 EMI Calculation Logic

> Based on **Simple Interest** (not compound)

- **Interest (I)** = P × N × R / 100  
- **Total Amount (A)** = P + I  
- **Monthly EMI** = A / (N × 12)

---

## ⚙️ Local Development

```bash
# Clone project
git clone https://github.com/yourusername/bank-lending.git
cd bank-lending

# Setup backend
cd backend
npm install
echo "DATABASE_URL=..." > .env
node server.js

# Setup frontend
cd ../bank-lending-frontend
npm install
echo "REACT_APP_BACKEND_URL=..." > .env
npm start
```

---

## 🌐 Deployment Notes

- **Backend** hosted on **Render**
  - Ensure `DATABASE_URL` and `NODE_ENV` are set
- **Frontend** hosted on **Vercel**
  - Add `REACT_APP_BACKEND_URL` in environment settings

---

## 🙋 Author

**Machireddy Meghana**  
📧 [meghanamachireddy10@gmail.com](mailto:meghanamachireddy10@gmail.com)  

---

## 📄 License

This project is under the MIT License.

