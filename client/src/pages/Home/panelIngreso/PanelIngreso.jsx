import './panelIngreso.css';

import { Form, Button } from 'react-bootstrap';
import { useState /* useEffect */ } from 'react';
import { useDispatch } from 'react-redux';
import { addIdentificationNumer } from '../../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const PanelIngreso = () => {
  const [validated, setValidated] = useState(false);
  const [dni, setDni] = useState('');
  const [dniError, setDniError] = useState('');
  const [activePideTurno, setActivePideTurno] = useState(true);
  const [activeConsultaTurno, setActiveConsultaTurno] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (dni.trim() === '') {
      setDniError('Su documento de identidad es obligatorio');
      setValidated(false);
    } else if (dni.length < 6) {
      setDniError('Su documento de identidad debe ser mayor a 6 dígitos');
      setValidated(false);
    } else if (dni.length > 10) {
      setDniError('Su documento de identidad debe tener menos de 10 dígitos');
      setValidated(false);
    } else {
      setDniError('');
      setValidated(true);
      dispatch(addIdentificationNumer({ identificationNumber: parseInt(dni) }));
      {
        activePideTurno ? navigate('nuevoTurno') : navigate('miTurno');
      }
    }
  };

  const handleDniChange = (event) => {
    setDni(event.target.value);
    if (dni.trim() === '') {
      setDniError('Su documento de identidad es obligatorio');
      setValidated(false);
    } else if (dni.length > 10) {
      setDniError('Su documento de identidad debe tener entre 6 y 10 dígitos');
      setValidated(false);
    } else {
      setDniError('');
      setValidated(true);
    }
  };

  return (
    <div className="panelIngreso">
      <div className="top-buttons-container">
        <button
          className={`${activePideTurno ? 'top-button active' : 'top-button'} `}
          onClick={() => {
            setActivePideTurno(!activePideTurno);
            setActiveConsultaTurno(false);
          }}
        >
          Pide tu turno
        </button>
        <button
          className={`${
            activeConsultaTurno ? 'top-button active' : 'top-button'
          } `}
          onClick={() => {
            setActiveConsultaTurno(!activeConsultaTurno);
            setActivePideTurno(false);
          }}
        >
          Consulta tu turno
        </button>
      </div>
      {activePideTurno ? (
        <div className="bottom-section">
          <div className="titleAndSubtitle_container">
            <h3>Optimiza tu tiempo y solicita un turno aquí</h3>
            <p>Por favor, ingresa tu número de identidad.</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Número de identidad </Form.Label>
              <Form.Control
                required
                type="number"
                value={dni}
                onChange={handleDniChange}
                isInvalid={dniError !== ''}
                className="form-control-lg"
                inputMode="numeric"
                pattern="\d*"
                onWheel={(e) => e.currentTarget.blur()}
              />
              <div className="transparentBackground"></div>
              <Form.Control.Feedback type="invalid" className="custom-feedback">
                {dniError}
              </Form.Control.Feedback>

              <Button
                type="submit"
                variant={validated ? 'success' : 'secondary'}
              >
                Continuar
              </Button>
            </Form.Group>
          </Form>
        </div>
      ) : (
        <div className="bottom-section">
          <div className="titleAndSubtitle_container">
            <h3>Visualiza y administra tu historial de turnos y datos</h3>
            <p>Por favor ingresa tu número de identidad</p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="validationCustom01">
              <Form.Label>Número de identidad </Form.Label>
              <Form.Control
                required
                type="number"
                value={dni}
                onChange={handleDniChange}
                isInvalid={dniError !== ''}
                className="form-control-lg"
                inputMode="numeric"
                pattern="\d*"
                onWheel={(e) => e.currentTarget.blur()}
              />
              <div className="transparentBackground"></div>
              <Form.Control.Feedback type="invalid" className="custom-feedback">
                {dniError}
              </Form.Control.Feedback>

              <Button
                type="submit"
                variant={validated ? 'success' : 'secondary'}
              >
                Continuar
              </Button>
            </Form.Group>
          </Form>
        </div>
      )}
    </div>
  );
};

export default PanelIngreso;
