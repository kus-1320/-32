import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';


function Reg() {

  const [fio, setFio] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = {
      fio,
      login,
      email,
      tel,
      password
    };
    try {
      const response = await fetch("http://localhost:3000/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),

      });
      const navigate = useNavigate();
      alert('Пользователь создан!')
      navigate('/login');
    } catch {

    }
  
};

  const handleSubmitFIO = (value) => setFio(value);
  const handleSubmitLogin = (value) => setLogin(value);
  const handleSubmitEmail = (value) => setEmail(value);
  const handleSubmitPhone = (value) => setTel(value);
  const handleSubmitPassword = (value) => setPassword(value);

  return (
    <>
      <Form onSubmit={handleSubmit}>

        <h1>Регистрация</h1>

        <Form.Group controlId="formBasicFio">
          <Form.Label>ФИО</Form.Label>
          <Form.Control
            type="text"
            placeholder="Иванов Иван Иванович"
            required
            name='fio'
            // pattern='[А-Яа-яЁё\s]+]'
            value={fio}
            title='Только кириллица и пробелы'
            onChange={(e) => handleSubmitFIO(e.target.value)}
          />
          <Form.Text className="text-muted">
            ФИО
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="user123"
            required
            name='login'
            minLength={6}
            pattern='[a-zA-Z0-9]{6,}'
            title='Латиница и цифры, минимум 6 символов'
            value={login}
            onChange={(e) => handleSubmitLogin(e.target.value)}
          />
          <Form.Text className="text-muted">
            Латиница и цифры, минимум 6 символов
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="formBasicEmail">
          <Form.Label>Почта</Form.Label>

          <Form.Control
            type="email"
            placeholder="email@mail.ru"
            required
            name='email'
            title='Адресс электронной почты должен содержать @'
            value={email}
            onChange={(e) => handleSubmitEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            Адресс электронной почты должен содержать @
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicTelephone">
          <Form.Label>Номер телефона</Form.Label>

          <Form.Control
            type="tel"
            placeholder="8(999)999-99-99"
            required
            name='tel'
            // pattern='8\(\d{3}\)\d{3}-\d{2}-\d{2}'
            title='Формат: 8(XXX)XXX-XX-XX'
            value={tel}
            onChange={(e) => handleSubmitPhone(e.target.value)}
          />
          <Form.Text className="text-muted">
            Формат: 8(XXX)XXX-XX-XX
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>

          <Form.Control
            type="password"
            placeholder="password"
            required
            name='password'
            minLength={8}
            title='минимум 8 символов'
            value={password}
            onChange={(e) => handleSubmitPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            минимум 8 символов
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Создать пользователя
        </Button>
        <p className="mt-3 text-center">
          Уже есть аккаунт? <Link to='/login'>Войти</Link> </p>

      </Form>
    </>
  )
}

export default Reg
