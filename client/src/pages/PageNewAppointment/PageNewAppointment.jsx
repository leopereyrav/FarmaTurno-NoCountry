import FormUser from '../../components/formUser/FormUser';
import moment from 'moment';
import './PageNewAppointment.css';
import Footer from '../../components/Footer/Footer';

const PageNuevoTurno = () => {
  const currentDate = moment().format(' DD/MM/YYYY');

  return (
    <>
      <div className="general-new">
        <div className="arrow-new">
          <a href="/">
            <img
              src="https://i.ibb.co/T0psFH9/arrow-left-circle-fillback.png"
              alt="arrow-left-circle-fillback"
              border="0"
            />
          </a>
          <div className="margin">
            <h1 className="titulo-new">Pide tu turno</h1>
            <p className="texto-new">
              Recuerda que estas reservando un turno para el dia de hoy{' '}
              <strong> {currentDate}</strong>
            </p>
          </div>
        </div>
        <div className="body-new">
          <div className="body-main-new">
            <img
              className="img-new"
              src="https://i.ibb.co/VJwHCqN/pana.png"
              alt="pana"
              border="0"
            />
            <FormUser />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PageNuevoTurno;
