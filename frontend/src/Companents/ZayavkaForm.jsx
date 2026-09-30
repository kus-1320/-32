import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function ZayavkaForm() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    alert('Вы записаны на курс!');
    navigate('/zay');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Название курса</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="Введите название курса" 
          required 
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Выберите курс</Form.Label>
        <Form.Select required>
          <option value="">-- Выберите курс --</option> {/* Пустой value для валидации! */}
          <option value="1">1 курс</option>
          <option value="2">2 курс</option>
          <option value="3">3 курс</option>
          <option value="4">4 курс</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Дата начала курса</Form.Label>
        <Form.Control 
          type="date" 
          min="2026-01-01"  
          max="2027-12-31"  
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Выберите оплату</Form.Label>
        <Form.Select required>
          <option value="">-- Выберите оплату --</option> {/* Пустой value для валидации! */}
          <option value="cash">Наличные</option>
          <option value="spb">СПБ</option>
          <option value="phone">По номеру телефона</option>
          <option value="card">По номеру карты</option>
        </Form.Select>
      </Form.Group> 

    
      <Button type="submit">Записаться</Button>
    </Form>
  );
}

export default ZayavkaForm;