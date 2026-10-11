import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import Container from 'react-bootstrap/Container';
import Logo from './media/logo.png'

import Reg from './Companents/Reg';
import Login from './Companents/Login';
import Applications from './Companents/Applications'
import ApplicationsF from './Companents/ApplicationF'
import Admin from './Companents/Admin';





function App() {
  return (
    <>
      <header style={{ "backgroundColor": "#6c757d" }}>
        <div style={{ "display": "flex", "alignItems": "center" }}>
          <img src={Logo} width="90" height="90" margin-left="30" />
          <h1 style={{ "marginLeft": 30 }}>Конференция.PФ</h1>
        </div>
      </header>

      <main style={{ backgroundColor: "#f8f9fa",minHeight: "100vh"}}>
        <BrowserRouter>
          <Container className="mt-4">
            <Routes>
              <Route path='/' element={<Reg />} />
              <Route path='/log' element={<Login />} />
              <Route path='/reg' element={<Reg />} />
              <Route path='/applF' element={<ApplicationsF />} />
              <Route path='/appl' element={<Applications />} />
              <Route path='/admin' element={<Admin />} />

            </Routes>
          </Container>
        </BrowserRouter>
      </main>

    </>

  );
}

export default App;