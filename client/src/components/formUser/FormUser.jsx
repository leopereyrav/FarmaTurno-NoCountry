import { useState } from 'react';
import { Container, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { ToggleButton, Stack } from 'react-bootstrap';
import './FormUserStyle.css';
import { addUser, addTimeSlot, addDate } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import ModalToConfirmYourTurn from '../Modals/ModalConfirmTurn';
import { postTurn } from '../../services/PostTurn';
import moment from 'moment';
import { useGetTurnsQuery } from '../../redux/turnSlices';

const FormUser = () => {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [seeModalConfirm, setSeeModalConfirm] = useState(false);
  const currentDate = moment().format(' DD/MM/YYYY');
  const currentHour = moment().subtract(2, 'hours').format('HH');
  const { name, surName, customerEmail, timeSlot, identificationNumber, date } =
    useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: name,
    lastName: surName,
    email: customerEmail,
    hour: timeSlot,
    isCheckboxChecked: false,
    isTurnoDisponible: false,
    isHorarioElegido: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    isCheckboxChecked: '',
  });

  const [valid, setValid] = useState({
    name: false,
    lastName: false,
    email: false,
  });

  const dispatch = useDispatch();

  const expresiones = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    email:
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
  };

  const { data, isError, isLoading, error } = useGetTurnsQuery(); //ME PUEDO DVOLVER LA DATA, EL ERROR(TRUE FALSE), PROPIEDAD IS LOADING (TRUEFALSE), ERROR CUAL ES EL ERROR
  if (isLoading) return <div>Loading...</div>;
  else if (isError) return <div>Error:{error}</div>;

  const horarios = [];
  for (let i = 8; i <= 19; i++) {
    const hora = {
      name: `${i < 10 ? '0' + i + ':00' : i + ':00'}`,
      value: 0,
    };
    horarios.push(hora);
  }
  if (data) {
    data.forEach((item) => {
      const timeSlot = item.timeSlot;
      const index = horarios.findIndex((hora) => hora.name === timeSlot);
      if (index !== -1) {
        horarios[index].value++;
      }
    });
  }
  console.log(horarios);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value);
  };
  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      isCheckboxChecked: true,
    }));
  };

  const handlechoose = (event) => {
    const { value, dataset } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      hour: dataset.name,
      range: dataset.value,
      isHorarioElegido: true,
      isTurnoDisponible: true,
    }));

    // handleClose();
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    switch (name) {
      case 'name':
      case 'lastName':
        if (!expresiones.name.test(value)) {
          errorMessage = `El nombre y apellido sólo puede contener letras, espacios y acentos`;
          setValid((prevValid) => ({
            ...prevValid,
            [name]: false,
          }));
        } else if (value.length < 3) {
          errorMessage = `El nombre y apellido debe contener al menos 3 dígitos`;
          setValid((prevValid) => ({
            ...prevValid,
            [name]: false,
          }));
        } else {
          setValid((prevValid) => ({
            ...prevValid,
            [name]: true,
          }));
        }
        break;

      case 'email':
        if (!expresiones.email.test(value)) {
          errorMessage = 'Ingrese una dirección de correo valida';
          setValid((prevValid) => ({
            ...prevValid,
            [name]: false,
          }));
        } else {
          setValid((prevValid) => ({
            ...prevValid,
            [name]: true,
          }));
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
    console.log(errorMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (valid.name & valid.lastName & valid.email) {
      if (form.checkValidity()) {
        if (formData.isCheckboxChecked) {
          setValidated(true);
          dispatch(
            addUser({
              name: formData.name,
              surName: formData.lastName,
              customerEmail: formData.email,
            }),
          );
          dispatch(addTimeSlot({ timeSlot: formData.hour }));
          dispatch(addDate({ date: currentDate }));
          const data = {
            name: formData.name,
            surName: formData.lastName,
            customerEmail: formData.email,
            timeSlot: formData.hour,
            identificationNumber,
          };
          console.log(data);
          postTurn(data, 'api/turn/')
            .then((response) => {
              console.log(response);

              setSeeModalConfirm(true);
            })
            .catch((error) => {
              console.error(error);
              alert('Hubo un error al pedir su turno');
            });

          resetForm();
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            isCheckboxChecked: 'Debes aceptar los términos y condiciones',
          }));
        }
      } else {
        setValidated(true);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: name,
      lastName: surName,
      email: customerEmail,
      hour: timeSlot,
      range: timeSlot,
      isCheckboxChecked: false,
      isHorarioElegido: false,
      isTurnoDisponible: false,
    });
    setValidated(false);
    setErrors({
      name: '',
      lastName: '',
      email: '',
      isCheckboxChecked: false,
    });
    // setValid({
    //   name: false,
    //   lastName: false,
    //   phone: false,
    // });
  };

  return (
    <>
      {seeModalConfirm && (
        <ModalToConfirmYourTurn closeMenu={() => setSeeModalConfirm(false)} />
      )}
      <div className="container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <h1 className="titulo">Farmacia Cruz Verde</h1>
          <p className="mb-0 info">Dirección: Cra. 15 #95-84 95-a</p>
          <p className="mb-3 info">
            Horario de atencion: Lunes a Sábados de 07hs a 19hs
          </p>
          <Row>
            <Form.Group
              className="mb-3"
              as={Col}
              xs={12}
              sm={6}
              controlId="formGridName"
            >
              <Form.Label className="texto">Nombre</Form.Label>
              <Form.Control
                className="form"
                type="name"
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                isInvalid={errors.name !== ''}
                isValid={valid.name}
              />
              <Form.Control.Feedback type="invalid" className=" texto">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Col}
              xs={12}
              sm={6}
              controlId="formGridLastname"
            >
              <Form.Label className="texto">Apellido</Form.Label>
              <Form.Control
                className="form"
                type="name"
                required
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                isInvalid={errors.lastName !== ''}
                isValid={valid.lastName}
              />
              <Form.Control.Feedback type="invalid" className=" texto">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <br />
          <Row className="justify-content-md-center">
            <Form.Group
              className="mb-3"
              as={Col}
              xs={12}
              sm={6}
              controlId="formGridNumber"
            >
              <Form.Label className="texto">Correo electrónico</Form.Label>
              <Form.Control
                className="form"
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={errors.email !== ''}
                isValid={valid.email}
              />
              <Form.Control.Feedback type="invalid" className=" texto">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 mt-4" as={Col}>
              <Button
                className={`buttonHorario mt-3 ${
                  formData.isHorarioElegido ? 'buttonHorario--inactive' : ''
                }`}
                variant="secondary"
                onClick={handleShow}
                disabled={!valid.name || !valid.lastName || !valid.email}
              >
                {formData.isHorarioElegido ? formData.hour : 'Elige un horario'}
              </Button>
            </Form.Group>
          </Row>
          <br />
          <Form.Group className="mb-3 info" id="formGridCheckbox">
            <Form.Check
              type="checkbox"
              label={
                <>
                  Acepto los{' '}
                  <a
                    href="https://drive.google.com/file/d/1FiGncNfCX7mb2QH-fDWp6-VFUQfnUgSo/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Términos y condiciones
                  </a>{' '}
                  y autorizo el uso de mis datos de acuerdo a la{' '}
                  <a
                    href="https://drive.google.com/file/d/1LxTcS5IrkKUMO1f0uNqHt8xra3-TplGK/view"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Declaración de privacidad
                  </a>{' '}
                </>
              }
              required
              name="isCheckboxChecked"
              checked={formData.isCheckboxChecked}
              onChange={handleCheckboxChange}
              // isinvalid={errors.isCheckboxChecked !== ''}
            />
            <Form.Control.Feedback type="invalid" className=" texto">
              {errors.isCheckboxChecked}
            </Form.Control.Feedback>
          </Form.Group>

          <Stack gap={2} className="col-md-5 mx-auto">
            <Button
              className={`buttonTurno ${
                formData.isTurnoDisponible ? 'buttonTurno--active' : ''
              }`}
              variant="secondary"
              type="submit"
              disabled={!formData.isTurnoDisponible}
            >
              Pedir turno
            </Button>
          </Stack>
        </Form>
      </div>

      {/* modal elegir horario */}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title className="mx-auto">Elige un horario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal">
          {horarios.map((hora, idx) => (
            <ToggleButton
              className="buttonModal "
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="success"
              name="hour"
              data-value={hora.value}
              checked={formData.hour === hora.name}
              // onChange={(e) => setRadioValue(e.currentTarget.value)}
              onClick={handlechoose}
              data-name={hora.name}
              disabled={hora.value > 4 || hora.name < currentHour}
            >
              {hora.name}hs
            </ToggleButton>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="buttonHorario mx-auto"
            variant="success"
            onClick={handleClose}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormUser;

// const handleNameChange = (e) => {
//   setName(e.target.value);
//   if (!expresiones.name.test(e.target.value)) {
//     setNameError('El nombre sólo puede contener letras, espacios y acentos');
//     setNameValid(false);
//   } else if (e.target.value.length < 3) {
//     setNameError('El nombre debe contener al menos 3 digitos');
//     setNameValid(false);
//   } else {
//     setNameError('');
//     setNameValid(true);
//   }
// };

// const handleLastNameChange = (e) => {
//   setLastName(e.target.value);
//   if (!expresiones.name.test(e.target.value)) {
//     setLastNameError(
//       'El apellido sólo puede contener letras, espacios y acentos',
//     );
//     setLastNameValid(false);
//   } else {
//     setLastNameError('');
//     setLastNameValid(true);
//   }
// };

// const handlePhoneChange = (e) => {
//   setPhone(e.target.value);
//   if (!expresiones.phone.test(e.target.value)) {
//     setPhoneError('El nro de letefono debe tener 10 digitos');
//     setPhoneValid(false)
//   } else {
//     setPhoneError('');
//     setPhoneValid(true);
//   }
// };

// const handleCheckboxChange = (e) => {
//   setIsCheckboxChecked(e.target.checked);
//   setIsCheckboxError(false);
// };

// const handlechoose = (event) => {
//   const { value, dataset } = event.currentTarget;

//   setHour(dataset.name);
//   setIsHorarioElegido(true);
//   setIsTurnoDisponible(true);
//   handleClose();
// };

// const resetForm = () => {
//   setName('');
//   setLastName('');
//   setPhone('');
//   setHour(0);
//   setIsHorarioElegido(false);
//   setIsTurnoDisponible(false);
//   setValidated(false);
//   setIsCheckboxChecked(false);
//   setIsCheckboxError(false);
//   setNameValid(false);
//   setLastNameValid(false);
//   setPhoneValid(false);
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (nameValid && lastNameValid && phoneValid) {
//     if (isCheckboxChecked) {
//       setValidated(true);
//       const formData = {
//         name,
//         lastName,
//         phone,
//         hour,
//       };
//       console.log(formData);
//       resetForm()
//     } else {
//       setIsCheckboxError(true);
//     }
//   }
// };
