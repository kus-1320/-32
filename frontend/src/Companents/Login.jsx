import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; 


function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('handleSubmit');
    

    const dataForm = {
      login, 
      password
    };

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.msg || "Ошибка входа");
      }
      if (result.role === 'admin') {
          navigate('/admin'); 
      } else {
          navigate('/zf');
      }

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Авторизация</h1>
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="login"
            required
            minLength={6}
            pattern='[a-zA-Z0-9]{6,}'
            title='Латиница и цифры, минимум 6 символов'
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit">
          Войти
        </Button>
        <p className="mt-3 text-center">
          Еще не зарегистрированы? <Link to='/reg'>Регистрация</Link>
        </p>
      </Form>
    </>
  );
}

export default Login;