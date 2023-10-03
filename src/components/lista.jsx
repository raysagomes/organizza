import ListGroup from 'react-bootstrap/ListGroup';
import Link from 'next/link';

function Lista() {
  return (
    <><ListGroup horizontal className='lista'>
      <ListGroup.Item className='Lista-itens' > Despesas </ListGroup.Item>
      <ListGroup.Item className='Lista-itens'>Cartão</ListGroup.Item>
      <ListGroup.Item className='Lista-itens'>Investimentos</ListGroup.Item>
    </ListGroup>
    <ListGroup horizontal className='lista'>
        <ListGroup.Item className='Lista-itens'>Rendimentos</ListGroup.Item>
        <ListGroup.Item className='Lista-itens'><Link className='Lista-itens-link' href="/carteira">
    Carteira</Link></ListGroup.Item>
        <ListGroup.Item className='Lista-itens'>Pagamentos</ListGroup.Item>
      </ListGroup></>
  );
}

export default Lista;