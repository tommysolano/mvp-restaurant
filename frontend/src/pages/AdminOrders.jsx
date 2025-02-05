import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API_URL = import.meta.env.VITE_API_URL; // Get backend URL from environment variable
const socket = io(API_URL); // Use dynamic backend URL

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/orders`)
      .then(response => setOrders(response.data))
      .catch(error => console.error("Error fetching orders:", error));

    socket.on("newOrder", (order) => {
      setOrders(prevOrders => [...prevOrders, order]);
    });

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off("newOrder");
      socket.off("orderUpdated");
    };
  }, []);

  const completeOrder = (orderId) => {
    axios.patch(`${API_URL}/api/orders/${orderId}`, { status: "completed" })
      .then(response => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === response.data._id ? response.data : order
          )
        );
      })
      .catch(error => console.error("Error updating order:", error));
  };

  return (
    <div>
      <h1>Restaurant Orders</h1>
      {orders.length === 0 ? <p>No orders yet...</p> : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              <strong>Table {order.tableId}:</strong>
              {order.items.map(item => (
                <p key={item.name}>{item.quantity}x {item.name}</p>
              ))}
              <p>Status: {order.status}</p>
              {order.status !== "completed" && (
                <button onClick={() => completeOrder(order._id)}>Complete Order</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;
