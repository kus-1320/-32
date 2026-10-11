import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; 


function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const dataForm = {
      login, 
      password
    };

    try {
      const response = await fetch("http://localhost:1234/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });

      const result = await response.json()

            if (result.message === "Неверный логин или пароль") {
                setError("Неверный логин или пароль");
                return
            }

            console.log(result);

            localStorage.setItem("user_id", JSON.stringify(result.id))

            if (result.role === "admin") {
                localStorage.setItem("role", "admin")
                navigate("/admin")
            } else {
                localStorage.setItem("role", "user")
                navigate("/applF")
            }

        } catch (error) {
            console.error(error);
            setError("Ошибка сети");
        }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} style={{"marginLeft": 300,"marginRight": 300 }} >
        <h1>Авторизация</h1>
        <Form.Group controlId="formBasicLogin">
          <Form.Label>Логин</Form.Label>
          <Form.Control
            type="text"
            placeholder="login"
            required
            data-testid="login-login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            data-testid="login-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" data-testid="login-submit">
          Войти
        </Button>
        {error && <p className="form-error">{error}</p>}
        <p className="mt-3 text-center">
          Еще не зарегистрированы? <Link to='/reg'>Регистрация</Link>
        </p>
        <p className="helper text-center">Вход администратора: логин Conf2027, пароль Demo77</p>
      </Form>
    </>
  );
}

export default Login;