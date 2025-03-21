import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function OrderComponent() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    socket.on('orderUpdated', (order) => {
      setOrders((prev) => [...prev, order]);
    });
  }, []);

  const placeOrder = () => {
    socket.emit('placeOrder', { product: 'Laptop', quantity: 1 });
  };

  return (
    <div>
      <button onClick={placeOrder}>Place Order</button>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{order.product} - {order.status}</li>
        ))}
      </ul>
    </div>
  );
}
export default OrderComponent;
