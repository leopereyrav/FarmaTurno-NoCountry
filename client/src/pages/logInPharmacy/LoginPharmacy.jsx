import './loginPharmacy.css';
import { Button, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { postTurn } from '../../services/PostTurn';
import Footer from '../../components/Footer/Footer';

export default function LoginPharmacy() {
  const [dataLogin, setDataLogin] = useState({
    userName: '',
    userPassword: '',
    errors: {},
  });
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin((prevdataLogin) => ({
      ...prevdataLogin,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateLoginForm();
    if (Object.keys(errors).length === 0) {
      const data = {
        userName: dataLogin.userName,
        password: dataLogin.userPassword,
      };
      console.log(data);
      postTurn(data, 'api/login')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al enviar los datos');
          }
          return response.json();
        })
        .then((responseData) => {
          //console.log(responseData);
          sessionStorage.setItem('companyName', responseData.companyName);
          sessionStorage.setItem('token', responseData.token);
          navigate('/pharmacy/profile');
        })
        .catch((error) => {
          alert('hubo un error al iniciar sesión');
          console.error(error);
        });
      //Hacer el post
      //si retorna un hash guardarlo y pasar a la siguiente pagina
      //si no retorna el hash mostrar un cartel que diga: Los datos ingresados
      //no corresponden con un usuario existente. Por favor regístrate para utilizar
      //el servicio
    } else {
      setDataLogin((prevdataLogin) => ({
        ...prevdataLogin,
        errors,
      }));
    }
  };

  const validateLoginForm = () => {
    const errors = {};

    if (!dataLogin.userName.match(/^[a-zA-Z0-9]+$/)) {
      errors.nameError = 'El nombre de usuario ingresado no es válido';
    }

    if (
      !dataLogin.userPassword.match(
        /^(?=.*[a-zA-Z0-9])(?!.*[\s-áéíóúÁÉÍÓÚ]).{8,16}$/,
      )
    ) {
      errors.passwordError =
        'Ingrese una contraseña válida (8 a 16 caracteres) sin espacios ni acentos';
    }

    setIsValid(Object.keys(errors).length === 0);
    return errors;
  };

  return (
    <div className="logIn_container">
      <div className="welcome_div">
        <div className="container_welcome">
          <p className="first_text">Gracias por elegir</p>
          <p className="title_page">FarmaTurno</p>
          <p className="second_text">Ingresa para comenzar</p>
        </div>
      </div>
      <Form noValidate onSubmit={handleSubmit}>
        <h2>Inicio de sesión</h2>
        <div className="login-dates-container">
          <Row className="custom-row">
            <Form.Label className="label">Usuario</Form.Label>
            <Form.Control
              required
              type="text"
              name="userName"
              value={dataLogin.userName}
              onChange={handleChange}
              isInvalid={!isValid && !!dataLogin.errors.nameError}
              isValid={isValid && !dataLogin.errors.nameError}
            />
            <Form.Control.Feedback type="invalid">
              {dataLogin.errors.nameError}
            </Form.Control.Feedback>
          </Row>
          <Row className="custom-row">
            <Form.Label className="label">Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              name="userPassword"
              value={dataLogin.userPassword}
              onChange={handleChange}
              isInvalid={!isValid && !!dataLogin.errors.passwordError}
              isValid={isValid && !dataLogin.errors.passwordError}
            />
            <Form.Control.Feedback type="invalid">
              {dataLogin.errors.passwordError}
            </Form.Control.Feedback>
          </Row>
          <Button
            variant={`${isValid ? 'success' : 'secondary'}`}
            type="submit"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </Button>
          <div className="forgotPassword-container">
            <p>
              ¿Olvidaste tu contraseña?{' '}
              <Link to="/pharmacy/recoverPassword/email"> Contáctanos</Link>
            </p>
            <p>
              ¿Aun no tienes tu cuenta?
              <Link to="/pharmacy/signUp"> Regístrate aquí </Link>
            </p>
          </div>
        </div>
      </Form>
      <Footer />
    </div>
  );
}
