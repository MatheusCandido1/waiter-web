import { useState } from 'react';
import { Board, OrderContainer } from './styles';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { api } from '../../services/axios';
import { toast } from 'react-toastify';

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder(orderId: string): void;
  onChangeOrderStatus(orderId: string, status: Order['status']): void;
}

export function OrderBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenOrderModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  function handleCloseOrderModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    try {
      setIsLoading(true);

      const status = selectedOrder?.status === 'WAITING'
        ? 'IN_PRODUCTION'
        : 'DONE';

      await api.patch(`orders/${selectedOrder?._id}`, {
        status,
      });

      toast.success(`O pedido da mesa ${selectedOrder!.table} teve o status alterado!`);
      onChangeOrderStatus(selectedOrder!._id, status);
      setIsLoading(false);
      handleCloseOrderModal();

    } catch (error) {
      console.log(error);
    }
  }

  async function handleCancelOrder() {
    try {
      const orderId = selectedOrder!._id;
      setIsLoading(true);
      await api.delete(`/orders/${orderId}`);
      toast.success(`O pedido da mesa ${selectedOrder!.table} foi cancelado!`);
      setIsLoading(false);
      onCancelOrder(orderId);
      handleCloseOrderModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseOrderModal}
        onCancel={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      {orders.length > 0 && (
        <OrderContainer>
          {orders.map((order) => (
            <button key={order._id} type="button" onClick={() => handleOpenOrderModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length == 1 ? '1 item': order.products.length + ' itens'}</span>
            </button>
          ))}
        </OrderContainer>
      )}
    </Board>
  );
}
