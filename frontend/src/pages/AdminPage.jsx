
import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <nav>
        <Link to="/admin/orders">Manage Orders</Link> | 
        <Link to="/admin/tables">Manage Tables</Link>
      </nav>
    </div>
  );
};

export default AdminPage;
