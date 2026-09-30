import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Navbar from 'react-bootstrap/Navbar';   
import Nav from 'react-bootstrap/Nav';        
import Container from 'react-bootstrap/Container';


import Reg from './Companents/Reg';
import Login from './Companents/Login';
import Glavnay from './Companents/Glavnay';
import ZayavkaForm from './Companents/ZayavkaForm'; 
import Zayavki from './Companents/Zayavki';      

function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Главная</Nav.Link>
            <Nav.Link as={Link} to="/reg">Регистрация</Nav.Link>
            <Nav.Link as={Link} to="/login">Вход</Nav.Link>
            <Nav.Link as={Link} to="/zf">Заявка</Nav.Link>
            <Nav.Link as={Link} to="/zay">Мои заявки</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path='/' element={<Glavnay />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reg' element={<Reg />} />
          <Route path='/zf' element={<ZayavkaForm />} />
          <Route path='/zay' element={<Zayavki />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;