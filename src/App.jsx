// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Customers from "./pages/Customers";
import Loans from "./pages/loans";
import Payments from "./pages/Payments";
import Ledger from "./pages/Ledger";
import CustomerOverview from "./pages/CustomerOverview";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/loans" element={<Loans />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/overview" element={<CustomerOverview />} />
      </Routes>
    </Router>
  );
}
