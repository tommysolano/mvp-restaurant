import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuList from "../components/MenuList";
import OrderForm from "../components/OrderForm"; // Import OrderForm

const MenuPage = () => {
  const { tableId } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu")
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
