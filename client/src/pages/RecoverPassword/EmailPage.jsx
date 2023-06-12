import { Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import goBack from './assets/backButton.svg';
import { RecoverContext } from './context/recoverContext';
import './emailPage.css';
const EmailPage = () => {
  const [isValid, setIsValid] = useState(false);
  const { emailData, setEmailData } = useContext(RecoverContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevEmail) => ({
      ...prevEmail,
      [name]: value,
    }));

    validateEmail();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid) {
      navigate('/pharmacy/recoverPassword/codeandpassword');
    } else if (emailData.error === '') {
      setEmailData((prevEmail) => ({
        ...prevEmail,
        error:
          'Correo electrónico no válido. Asegúrese de que tenga un formato como este: ejemplo@email.com',
      }));
    }
  };

  const validateEmail = () => {
    // Validación para registrationEmail
    if (
      !emailData.email.match(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
    ) {
      setEmailData((prevEmail) => ({
        ...prevEmail,
        error:
          'Correo electrónico no válido. Asegúrese de que tenga un formato como este: ejemplo@email.com',
      }));
      setIsValid(false);
    } else {
      setEmailData((prevEmail) => ({
        ...prevEmail,
        error: '',
      }));
      setIsValid(true);
    }
  };
  const handleGoBack = () => {
    navigate('/pharmacy/signUp/adminitration_allowed');
  };

  return (
    <section className="emailPage">
      <div className="title_subtitle__email">
        <div>
          <img
            src={goBack}
            alt="boton para ir a loguearse"
            onClick={handleGoBack}
          />
          <h2>¿Olvidaste tu contraseña?</h2>
        </div>
        <p>
          Ingresa la dirección de correo electrónico asociada a tu cuenta y te
          enviaremos un código para reestablecer tu contraseña
        </p>
      </div>
      <div className="emailContainer__email">
        <div className="emailContainer_title__email">
          <h3>Reestablece tu contraseña</h3>
        </div>
        <Form className="form-email" noValidate onSubmit={handleSubmit}>
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={emailData.email}
            onChange={handleChange}
            isInvalid={!isValid && !!emailData.error}
            isValid={isValid && !emailData.error}
          />
          <Form.Control.Feedback type="invalid">
            {emailData.error}
          </Form.Control.Feedback>
          <Button
            variant={`${isValid ? 'success' : 'secondary'}`}
            type="submit"
            onClick={handleSubmit}
          >
            Enviar código
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default EmailPage;
