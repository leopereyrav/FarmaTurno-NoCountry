/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { useContext, useState, useEffect } from 'react';
import { SignUpContext } from '../context/pharmacyContext';
import './pharmacyDetails.css';
import { addPharmacyDetails } from '../../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import pana from '../assets/pana.png';

const PharmacyDetails = () => {
  const { setFormToShow } = useContext(SignUpContext);
  const [pharmacyData, setPharmacyData] = useState({
    pharmacyName: '',
    pharmacyNit: '',
    pharmacyCity: '',
    pharmacyAdress: '',
    pharmacyPhone: '',
    pharmacyOpenHour: '',
    pharmacyCloseHour: '',
    errors: {},
  });
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(false);
  const {
    pharmacyName,
    pharmacyNit,
    pharmacyCity,
    pharmacyAdress,
    pharmacyPhone,
    pharmacyOpenHour,
    pharmacyCloseHour,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    setPharmacyData((prevPharmacyData) => ({
      ...prevPharmacyData,
      pharmacyName: pharmacyName,
      pharmacyNit: pharmacyNit,
      pharmacyCity: pharmacyCity,
      pharmacyAdress: pharmacyAdress,
      pharmacyPhone: pharmacyPhone,
      pharmacyOpenHour: pharmacyOpenHour,
      pharmacyCloseHour: pharmacyCloseHour,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPharmacyData((prevOwnerData) => ({
      ...prevOwnerData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validatePharmacyForm();
    if (Object.keys(errors).length === 0) {
      dispatch(
        addPharmacyDetails({
          pharmacyName: pharmacyData.pharmacyName,
          pharmacyNit: pharmacyData.pharmacyNit,
          pharmacyCity: pharmacyData.pharmacyCity,
          pharmacyAdress: pharmacyData.pharmacyAdress,
          pharmacyPhone: pharmacyData.pharmacyPhone,
          pharmacyOpenHour: pharmacyData.pharmacyOpenHour,
          pharmacyCloseHour: pharmacyData.pharmacyCloseHour,
        }),
      );
      setTimeout(() => {
        setFormToShow('c');
      }, 1000);
    } else {
      setPharmacyData((prevPharmacyData) => ({
        ...prevPharmacyData,
        errors,
      }));
    }
  };

  const validatePharmacyForm = () => {
    const errors = {};

    if (!pharmacyData.pharmacyName.match(/^(?!\s*$)[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      errors.pharmacyName = 'Ingrese un nombre válido';
    }

    if (!pharmacyData.pharmacyNit.match(/^[a-zA-Z0-9]{10}$/)) {
      errors.pharmacyNit = 'Ingrese un NIT valido';
    }

    if (!pharmacyData.pharmacyCity.match(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)) {
      errors.pharmacyCity = 'Ingrese un nombre de ciudad válido';
    }

    if (
      !pharmacyData.pharmacyAdress.match(/^[A-Za-z0-9\s#áéíóúñÁÉÍÓÚÑ.,()-]+$/)
    ) {
      errors.pharmacyAdress = 'Ingrese una dirección válida';
    }

    if (!pharmacyData.pharmacyPhone.match(/^(\d{10})?$/)) {
      errors.pharmacyPhone = 'Ingrese un número de telefono válido';
    }

    if (
      !pharmacyData.pharmacyOpenHour.match(
        /^(0?[1-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      )
    ) {
      errors.pharmacyOpenHour =
        'Ingrese la hora en el formato correcto ej: 2:00 o 20:00';
    }

    if (
      !pharmacyData.pharmacyCloseHour.match(
        /^(0?[1-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      )
    ) {
      errors.pharmacyCloseHour =
        'Ingrese la hora en el formato correcto ej: 2:00 o 20:00';
    }

    setIsValid(Object.keys(errors).length === 0);
    return errors;
  };
  return (
    <div className="pharmacy-details">
      <div className="pharmacyTitle_container">
        <h2>Datos de la farmacia</h2>
        <p>
          A continuación, completa los campos con la información de tu farmacia.
        </p>
      </div>

      <Form noValidate onSubmit={handleSubmit}>
        <Row className="custom-row row1">
          <Form.Label className="label">Nombre de la farmacia</Form.Label>
          <Form.Control
            required
            type="text"
            name="pharmacyName"
            value={pharmacyData.pharmacyName}
            onChange={handleChange}
            isInvalid={!isValid && !!pharmacyData.errors.pharmacyName}
            isValid={isValid && !pharmacyData.errors.pharmacyName}
          />
          <Form.Control.Feedback type="invalid">
            {pharmacyData.errors.pharmacyName}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row2">
          <Form.Label className="label">NIT</Form.Label>
          <Form.Control
            required
            type="text"
            name="pharmacyNit"
            value={pharmacyData.pharmacyNit}
            onChange={handleChange}
            isInvalid={!isValid && !!pharmacyData.errors.pharmacyNit}
            isValid={isValid && !pharmacyData.errors.pharmacyNit}
            maxLength={10}
          />
          <Form.Control.Feedback type="invalid">
            {pharmacyData.errors.pharmacyNit}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row3">
          <Form.Label className="label">Ciudad</Form.Label>
          <Form.Control
            required
            type="text"
            name="pharmacyCity"
            value={pharmacyData.pharmacyCity}
            onChange={handleChange}
            isInvalid={!isValid && !!pharmacyData.errors.pharmacyCity}
            isValid={isValid && !pharmacyData.errors.pharmacyCity}
          />
          <Form.Control.Feedback type="invalid">
            {pharmacyData.errors.pharmacyCity}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row4">
          <Form.Label className="label">Dirección</Form.Label>
          <Form.Control
            required
            type="text"
            name="pharmacyAdress"
            value={pharmacyData.pharmacyAdress}
            onChange={handleChange}
            isInvalid={!isValid && !!pharmacyData.errors.pharmacyAdress}
            isValid={isValid && !pharmacyData.errors.pharmacyAdress}
          />
          <Form.Control.Feedback type="invalid">
            {pharmacyData.errors.pharmacyAdress}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row5">
          <Form.Label className="label">
            Número telefónico (opcional)
          </Form.Label>
          <Form.Control
            type="text"
            name="pharmacyPhone"
            value={pharmacyData.pharmacyPhone}
            onChange={handleChange}
            isInvalid={!isValid && !!pharmacyData.errors.pharmacyPhone}
            isValid={isValid && !pharmacyData.errors.pharmacyPhone}
          />
          <Form.Control.Feedback type="invalid">
            {pharmacyData.errors.pharmacyPhone}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row6">
          <Form.Label className="label">Horario de apertura </Form.Label>
          <Form.Control
            required
            type="text"
            name="pharmacyOpenHour"
            value={pharmacyData.pharmacyOpenHour}
            onChange={handleChange}
            isInvalid={!isValid && !!pharmacyData.errors.pharmacyOpenHour}
            isValid={isValid && !pharmacyData.errors.pharmacyOpenHour}
          />
          <Form.Control.Feedback type="invalid">
            {pharmacyData.errors.pharmacyOpenHour}
          </Form.Control.Feedback>
        </Row>
        <Row className="custom-row row7">
          <Form.Label className="label">Horario de cierre</Form.Label>
          <Form.Control
            required
            type="text"
            name="pharmacyCloseHour"
            value={pharmacyData.pharmacyCloseHour}
            onChange={handleChange}
            isInvalid={!isValid && !!pharmacyData.errors.pharmacyCloseHour}
            isValid={isValid && !pharmacyData.errors.pharmacyCloseHour}
          />
          <Form.Control.Feedback type="invalid">
            {pharmacyData.errors.pharmacyCloseHour}
          </Form.Control.Feedback>
        </Row>
        <img src={pana} alt="" />
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

export default PharmacyDetails;
