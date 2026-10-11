import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Reg() {

  const [fio, setFio] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = {
      login, password, fio, tel, email
    };
    console.log(dataForm);

    try {
      const response = await fetch("http://localhost:1234/reg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),

        })

      const result = await response.json();
      console.log(result);


      alert('Пользователь создан!')
      navigate('/log');
    } catch (error) {
      console.error(error.message);
    }

  };

  const handleSubmitFio = (value) => setFio(value);
  const handleSubmitLogin = (value) => setLogin(value);
  const handleSubmitEmail = (value) => setEmail(value);
  const handleSubmitPhone = (value) => setTel(value);
  const handleSubmitPassword = (value) => setPassword(value);


  return (

    <>
      <h1>Регистрация</h1>

      <Form onSubmit={handleSubmit} style={{ "marginLeft": 300, "marginRight": 300 }}>

        <Form.Group controlId="formBasicLogin">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="user123"
            required
            name='login'
            minLength={6}
            title='Латиница и цифры, минимум 6 символов'
            data-testid="reg-login"
            value={login}
            onChange={(e) => handleSubmitLogin(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            Латиница и цифры, минимум 6 символов
          </Form.Text> */}
        </Form.Group>
        <br />

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            required
            name='password'
            minLength={8}
            title='минимум 8 символов'
            data-testid="reg-password"
            value={password}
            onChange={(e) => handleSubmitPassword(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            минимум 8 символов
          </Form.Text> */}
        </Form.Group>
        <br />


        <Form.Group controlId="formBasicFio">
          <Form.Label>ФИО</Form.Label>
          <Form.Control
            type="text"
            placeholder="Иванов Иван Иванович"
            required
            name='fio'
            title='Только кириллица и пробелы'
            data-testid="reg-fullname"
            value={fio}
            onChange={(e) => handleSubmitFio(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            ФИО
          </Form.Text> */}
        </Form.Group>
        <br />

        <Form.Group controlId="formBasicTelephone">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            type="tel"
            placeholder="8(999)999-99-99"
            required
            name='tel'
            title='Формат: 8(XXX)XXX-XX-XX'
            data-testid="reg-phone"
            value={tel}
            onChange={(e) => handleSubmitPhone(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            Формат: 8(XXX)XXX-XX-XX
          </Form.Text> */}
        </Form.Group>
        <br />

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Почта</Form.Label>

          <Form.Control
            type="email"
            placeholder="email@mail.ru"
            required
            name='email'
            title='Адресс электронной почты должен содержать @'
            data-testid="reg-email"
            value={email}
            onChange={(e) => handleSubmitEmail(e.target.value)}
          />
          {/* <Form.Text className="text-muted">
            Адресс электронной почты должен содержать @
          </Form.Text> */}
        </Form.Group>
        <br />

        <Button variant="primary" type="submit" data-testid="reg-submit">
          Создать пользователя
        </Button>
        <p className="mt-3 text-center">
          Уже есть аккаунт? <Link to='/log'>Войти</Link> </p>
      </Form>

    </>
  );
}

export default Reg;