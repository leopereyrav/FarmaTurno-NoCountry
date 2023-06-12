/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { useContext, useState, useEffect } from 'react';
import { SignUpContext } from '../context/pharmacyContext';
import './pharmacyOwner.css';
import { addOwnerDetails } from '../../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import pana from '../assets/pana.png';

const PharmacyOwnerDetails = () => {
  const { setFormToShow } = useContext(SignUpContext);
  const [ownerData, setOwnerData] = useState({
    ownerName: '',
    ownerSurname: '',
    ownerDni: '',
    errors: {},
  });
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const { ownerName, ownerSurname, ownerDni } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    setOwnerData((prevOwnerData) => ({
      ...prevOwnerData,
      ownerName: ownerName,
      ownerSurname: ownerSurname,
      ownerDni: ownerDni,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setOwnerData((prevOwnerData) => ({
      ...prevOwnerData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateOwnerForm();
    if (Object.keys(errors).length === 0) {
      dispatch(
        addOwnerDetails({
          ownerName: ownerData.ownerName,
          ownerSurname: ownerData.ownerSurname,
          ownerDni: ownerData.ownerDni,
        }),
      );
      setTimeout(() => {
        setFormToShow('b');
      }, 1000);
    } else {
      setOwnerData((prevOwnerData) => ({
        ...prevOwnerData,
        errors,
      }));
    }
  };

  const validateOwnerForm = () => {
    const errors = {};

    // Validación para ownerName
    if (!ownerData.ownerName.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      errors.ownerName = 'Ingrese un nombre válido';
    }

    // Validación para ownerSurname
    if (!ownerData.ownerSurname.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      errors.ownerSurname = 'Ingrese un apellido válido';
    }

    // Validación para ownerDni
    if (!ownerData.ownerDni.match(/^\d{6,10}$/)) {
      errors.ownerDni = 'Ingrese un número de identidad válido';
    }

    setIsValid(Object.keys(errors).length === 0);
    return errors;
  };

  return (
    <div className="pharmacy-owner">
      <div className="ownerTitle_container">
        <h2>Datos del encargado/responsable</h2>
        <p>
          Para comenzar, completa los campos con la información del responsable
          de la farmacia.
        </p>
      </div>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="custom-row row1">
          <Form.Label className="label">Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            name="ownerName"
            value={ownerData.ownerName}
            onChange={handleChange}
            isInvalid={!isValid && !!ownerData.errors.ownerName}
            isValid={isValid && !ownerData.errors.ownerName}
          />
          <Form.Control.Feedback type="invalid">
            {ownerData.errors.ownerName}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row2">
          <Form.Label className="label">Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            name="ownerSurname"
            value={ownerData.ownerSurname}
            onChange={handleChange}
            isInvalid={!isValid && !!ownerData.errors.ownerSurname}
            isValid={isValid && !ownerData.errors.ownerSurname}
          />
          <Form.Control.Feedback type="invalid">
            {ownerData.errors.ownerSurname}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row3">
          <Form.Label className="label">Número de identidad</Form.Label>
          <Form.Control
            required
            type="number"
            name="ownerDni"
            value={ownerData.ownerDni}
            onChange={handleChange}
            isInvalid={!isValid && !!ownerData.errors.ownerDni}
            isValid={isValid && !ownerData.errors.ownerDni}
            maxLength={10}
          />
          <Form.Control.Feedback type="invalid">
            {ownerData.errors.ownerDni}
          </Form.Control.Feedback>
        </Row>
        <img src={pana} alt="imagen descriptiva del servicio" />
        <Button
          variant={`${isValid ? 'success' : 'secondary'}`}
          type="submit"
          onClick={handleSubmit}
        >
          Siguiente
        </Button>
      </Form>
    </div>
  );
};

export default PharmacyOwnerDetails;
