import { Col, Row } from 'react-bootstrap';
import '../Footer/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="paragraph-footer">
          <p className="footer-brand">
            © 2023 <span className="brand-color">FarmaTurno</span>. Todos los
            derechos reservados
          </p>
        </div>
        <Row lg={3} className="footer-links justify-content-center">
          <a
            href="https://drive.google.com/file/d/1LxTcS5IrkKUMO1f0uNqHt8xra3-TplGK/view"
            target="_blank"
            className="footer-link p-0"
          >
            Políticas de privacidad
          </a>
          <a
            href="https://drive.google.com/file/d/1FiGncNfCX7mb2QH-fDWp6-VFUQfnUgSo/view"
            target="_blank"
            className="footer-link p-0"
          >
            Términos y condiciones
          </a>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
