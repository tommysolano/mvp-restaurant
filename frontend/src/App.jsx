
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MenuPage from "./pages/MenuPage";
import AdminOrders from "./pages/AdminOrders";
import AdminTables from "./pages/AdminTables";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/admin/orders">Orders</Link> | <Link to="/admin/tables">Tables</Link>
      </nav>
      <Routes>
        <Route path="/menu/:tableId" element={<MenuPage />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/tables" element={<AdminTables />} />
      </Routes>
    </Router>
  );
}

export default App;
