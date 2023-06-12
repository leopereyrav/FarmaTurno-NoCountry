import { RecoverContext } from './context/recoverContext';

import { useContext, useState } from 'react';
import { Form, Button, Row, Modal } from 'react-bootstrap';
import goBack from './assets/backButton.svg';
import { putData } from '../../services/putData';
import { useNavigate } from 'react-router';
import './codeAndPassword.css';
import Footer from '../../components/Footer/Footer';

const CodeAndPasswordPage = () => {
  const navigate = useNavigate();
  const { emailData } = useContext(RecoverContext);
  const [validCode, setValidCode] = useState(false);
  const [myCode, setMyCode] = useState('123456');
  const [typedCode, setTypedCode] = useState({
    code: '',
    error: '',
  });
  const [passwordData, setPasswordData] = useState({
    passwordOne: '',
    passwordTwo: '',
    errors: {},
  });
  //ninjin.ninjin@gmail.com
  //ninjinFarma
  //ElNinja123
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCodeChange = (e) => {
    const { name, value } = e.target;
    setTypedCode((prevCode) => ({
      ...prevCode,
      [name]: value,
    }));
    if (value !== myCode) {
      setTypedCode((prevCode) => ({
        ...prevCode,
        error: 'Ingresa el codigo correcto para reestablecer la contraseña',
      }));
      setValidCode(false);
    } else {
      setTypedCode((prevCode) => ({
        ...prevCode,
        error: '',
      }));
      setValidCode(true);
      console.log(validCode);
    }
  };

  const handleSubmitCode = (e) => {
    e.preventDefault();
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    const errors = validatePasswords();
    if (Object.keys(errors).length === 0) {
      const data = {
        email: emailData.email,
        password: passwordData.passwordOne,
      };
      putData(data, 'api/pharmacy')
        .then((response) => {
          console.log(response);
          alert('La contraseña ha sido cambiada con éxito');
          setShowModal(true);
          setTimeout(() => {
            navigate('/pharmacy/signUp/adminitration_allowed');
          }, 500);
        })
        .catch((error) => {
          console.error(error);
          alert(
            'Hubo un error al cambiar su contraseña, verifique que el mail ingresado sea el de una cuenta activa',
          );
        });
    }
  };

  const validatePasswords = () => {
    const errors = {};

    // Validación para passwordOne
    if (
      !passwordData.passwordOne.match(
        /^(?=.*[a-zA-Z0-9])(?!.*[\s-áéíóúÁÉÍÓÚñÑ]).{8,16}$/,
      )
    ) {
      errors.passwordOne =
        'Ingrese una contraseña válida (8 a 16 caracteres) sin espacios ni acentos';
    }

    // Validación para passwordTwo
    if (passwordData.passwordOne !== passwordData.passwordTwo) {
      errors.passwordTwo = 'Las contraseñas no coinciden';
    }

    setIsValidPassword(Object.keys(errors).length === 0);
    setPasswordData((prevPassword) => ({
      ...prevPassword,
      errors: errors,
    }));
    return errors;
  };

  const handleGoBack = () => {
    navigate('/pharmacy/recoverPassword/email');
  };
  return (
    <section className="code-section">
      <div className="title_subtitle__code">
        <div className="goBackAndTitle">
          <img src={goBack} alt="boton para ir atras" onClick={handleGoBack} />
          <h2>Listo, código enviado</h2>
        </div>
        <p>Ingresa el código que te enviamos a tu correo electrónico.</p>
        <Form className="form-code" noValidate onSubmit={handleSubmitCode}>
          <Form.Label>Código</Form.Label>
          <Form.Control
            required
            type="number"
            name="code"
            value={typedCode.code}
            onChange={handleCodeChange}
            isInvalid={!validCode && !!typedCode.error}
            isValid={validCode && !typedCode.error}
          />
          <Form.Control.Feedback type="invalid">
            {typedCode.error}
          </Form.Control.Feedback>
        </Form>
      </div>
      <div className="new-password">
        <h3>Ingresa tu nueva contraseña</h3>
        <p>Recuerda que la contraseña debe tener entre 8 y 16 dígitos</p>
        <Form
          className="form-password"
          noValidate
          onSubmit={handleSubmitPassword}
        >
          <Row className="custom-row row1">
            <Form.Label className="label">Nueva Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              name="passwordOne"
              value={passwordData.passwordOne}
              onChange={handleChangePassword}
              isInvalid={!isValidPassword && !!passwordData.errors.passwordOne}
              isValid={isValidPassword && !passwordData.errors.passwordOne}
              disabled={!validCode}
            />
            <Form.Control.Feedback type="invalid">
              {passwordData.errors.passwordOne}
            </Form.Control.Feedback>
          </Row>
          <Row className="custom-row row2">
            <Form.Label className="label">Confirmar Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              name="passwordTwo"
              value={passwordData.passwordTwo}
              onChange={handleChangePassword}
              isInvalid={!isValidPassword && !!passwordData.errors.passwordTwo}
              isValid={isValidPassword && !passwordData.errors.passwordTwo}
              disabled={!validCode}
            />
            <Form.Control.Feedback type="invalid">
              {passwordData.errors.passwordTwo}
            </Form.Control.Feedback>
          </Row>
          <Button
            variant={`${isValidPassword ? 'success' : 'secondary'}`}
            type="submit"
            onClick={handleSubmitPassword}
            disabled={!validCode}
          >
            Siguiente
          </Button>
        </Form>
      </div>
      <Footer />
    </section>
  );
};

export default CodeAndPasswordPage;
