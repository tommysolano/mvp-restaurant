import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const OrderForm = ({ tableId, menu }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // Add item to order
  const handleSelect = (item) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);
      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Submit order to backend
  const handleSubmit = () => {
    if (selectedItems.length === 0) return alert("Select at least one item");

    const order = {
        tableId,
        items: selectedItems.map(({ name, quantity, price }) => ({
          name,
          quantity,
          price,
        })),
        totalPrice: selectedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };

    axios
      .post("http://localhost:5000/api/orders", order)
      .then(() => {
        alert("Order placed successfully!");
        setSelectedItems([]); // Reset selection
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <div>
      <h2>Select Items:</h2>
      {menu.map((item) => (
        <button key={item._id} onClick={() => handleSelect(item)}>
          {item.name} - ${item.price}
        </button>
      ))}

      <h2>Selected Items:</h2>
      <ul>
        {selectedItems.map((item) => (
          <li key={item._id}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </ul>

      <button onClick={handleSubmit}>Place Order</button>
    </div>
  );
};

// PropTypes validation
OrderForm.propTypes = {
  tableId: PropTypes.string.isRequired,
  menu: PropTypes.array.isRequired,
};

export default OrderForm;
