import { useState, useEffect } from 'react';

import { api } from '../../services/axios';

import { Container } from './styles';

import { OrderBoard } from '../OrderBoard';
import { Order } from '../../types/Order';

import socketIo from 'socket.io-client';

import { BASE_URL } from '../../services/axios';

import { toast } from 'react-toastify';



export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo(BASE_URL, {
      transports: ['websocket'],
    });

    socket.on('order@new', (order) => {
      setOrders(prevState =>prevState.concat(order));
      toast.success('Novo pedido recebido');
    });

  }, []);

  useEffect(() => {
    api.get('orders')
      .then(({ data }) => {
        setOrders(data);
      });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  return (
    <Container>
      <OrderBoard
        icon="🕑"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrderBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrderBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
