import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuList from "../components/MenuList";
import OrderForm from "../components/OrderForm"; // Import OrderForm

const API_URL = import.meta.env.VITE_API_URL; // Use environment variable

const MenuPage = () => {
  const { tableId } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/menu`) // Use env variable
      .then(response => setMenu(response.data))
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  return (
    <div>
      <h1>Menu for Table {tableId}</h1>
      {menu.length === 0 ? <p>Loading menu...</p> : (
        <>
          <MenuList menu={menu} />
          <OrderForm tableId={tableId} menu={menu} />
        </>
      )}
    </div>
  );
};

export default MenuPage;
