import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import elipse from './assets/Ellipse.png';
import './errorPage.css';
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="errorPage">
      <h2>Hubo un error!</h2>
      <img src={elipse} alt="imagen descriptiva" />
      <Button variant="success" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </div>
  );
};

export default ErrorPage;
