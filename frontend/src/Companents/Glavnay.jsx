import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import { Link } from 'react-router-dom';

function CardExample() {
  return (
    <div>
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}> Запись на курсы </h1>
      <div className="d-flex justify-content-around" >
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="./src/photo/фото.jpg" />
        <Card.Body>
          <Card.Title>Психология влияния </Card.Title>
          <Card.Text>
            Запишись прямо сейчас и получи скидку 10%
          </Card.Text>
          <Button  variant="primary" as={Link} to='./reg'>Записаться</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="./src/photo/фото.jpg" />
        <Card.Body>
          <Card.Title>Архитектура личности</Card.Title>
          <Card.Text>
            Запишись прямо сейчас и получи скидку 10%
          </Card.Text>
          <Button  variant="primary" as={Link} to='./reg'>Записаться</Button>
        </Card.Body>
      </Card>
    
    </div>
    </div>
    
  );
}

export default CardExample;