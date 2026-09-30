import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import Alert from 'react-bootstrap/Alert';

function Login() {

  return (
   <>
   <Form>
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
    />
  </Form.Group>
 
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Пароль</Form.Label>
    <Form.Control type="password"
     placeholder="Password" 
     minLength={8}
     required/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Войти
  </Button>
   <p className="mt-3 text-center">
             Еще не зарегистрированы? <Link to='/reg'>Регистрация</Link> </p>
            
</Form>
   </>
  )
}

export default Login;
