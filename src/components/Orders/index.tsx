import { Container } from './styles';

import { OrderBoard } from '../OrderBoard';
import { Order } from '../../types/Order';

const orders: Order[] = [
  {
    '_id': '6373f00d1138d6990cfab64f',
    'table': '03',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Coca Cola',
          'imagePath': '1668541717185-coca-cola.png',
          'price': 7,
        },
        'quantity': 4,
        '_id': '6373f00d1138d6990cfab650'
      }
    ],
  }
];

export function Orders() {
  return (
    <Container>
      <OrderBoard
        icon="🕑"
        title="Fila de espera"
        orders={orders}
      />
      <OrderBoard
        icon="👩‍🍳"
        title="Em preparação"
        orders={[]}
      />
      <OrderBoard
        icon="✅"
        title="Pronto"
        orders={[]}
      />
    </Container>
  );
}
