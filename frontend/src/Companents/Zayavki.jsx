import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';



function Zapis() {
  const navigate = useNavigate();

  return (
    <Form>
     
            <h1 className="text-center mb-4">Мои заявки</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Название курса</th>
                  <th>Статус заявки</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Психология влияния</td>
                  <td>Обучение идет</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Архитектура личности</td>
                  <td>Обучение завершено</td>
                </tr>
              </tbody>
            </Table>

            <Form.Label>Оцените курс</Form.Label>
      <Form.Range />

            <Form.Group className="mt-4">
              <Form.Label>Оставьте отзыв о программе курса</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
               <Button variant="success" type="submit" className="mt-3">
              Оставить отзыв
            </Button>
        
      
    </Form>
  );
}

export default Zapis;