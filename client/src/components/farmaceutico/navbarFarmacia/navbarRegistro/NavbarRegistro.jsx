import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Offcanvas,
    Dropdown,
  } from 'react-bootstrap';
  // import '../navbarRegistro/navbarRegistroStyles.css';
  import '../../../NavBar/navbar.css'
  import { useNavigate } from 'react-router-dom';
  
  const NavbarRegistro = () => {
    const navigate = useNavigate();
  
    const cerrarSesion=()=>{
      sessionStorage.removeItem('token');
      navigate(`/pharmacy`)
    }
  
    return (
        <>
      <Navbar expand="lg" className="navbar p-0">
        <Container fluid className="  my-1 ">
          <Navbar.Brand href="/" className="txTitle">
            <img
              src="https://i.ibb.co/wpSp6pg/logo1-1-Photo-Room-png-Photo-Room.png"
              alt="logo"
              className="logo   "
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Offcanvas
            className="offcanvas"
            id={`offcanvasNavbar-expand-xs`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xs`}
            placement="start"
          >
            <Offcanvas.Header closeButton className='offcanvasHeader'>   
            <img
                src="https://i.ibb.co/wpSp6pg/logo1-1-Photo-Room-png-Photo-Room.png"
                alt="logo"
                className="mr-3  logoOffcanvas   "
              />
              </Offcanvas.Header>
            <Offcanvas.Body className='offcanvasBody'>
              <Nav className="me-auto"></Nav>
              <Nav className="txCategory">
                <Nav.Link>
                  <p className="txCategory  my-1 acercaFarmTx">Acerca de FarmaTurno</p>
                </Nav.Link>
                <Nav.Link>
                  <p
                    className="txCategory my-1 soyFarmaciaTx"
                    onClick={() => navigate('/pharmacy/signUp/adminitration_allowed')}
                  >Iniciar Sesion</p>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>

    );
  };
  
  export default NavbarRegistro;
  