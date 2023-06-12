import './about.css';
import computer from './assets/computer.png';
import calendar from './assets/Calendarcheck.png';
const About = () => {
  return (
    <div className="about">
      <div className="title-description__about">
        <h2>Una aplicación web para gestionar turnos</h2>
        <p>
          Solicitar turnos en las farmacias y droguerías adscritas a EPS de
          Colombia puede ser agotador, y muchas veces implica una gran pérdida
          de tiempo.
        </p>
        <p>
          Decidimos darle una solución a esta problemática diaria, pensando en
          las personas y sus necesidades.
        </p>
      </div>
      <div className="computerContainer">
        <div className="imgContainer">
          <img src={computer} alt="Imagen descriptiva de una computadora" />
        </div>
        <p>
          Creamos FarmaTurno, un turnero online diario, para que evites largas
          filas de espera.
        </p>
      </div>
      <div className="promoting-container">
        <div className="first-promoting">
          <div className="tittle-logo-container__promoting">
            <img src={calendar} alt="imagen de calendario" />
            <h2>Practicidad para farmacias</h2>
          </div>
          <p>
            Con FarmaTurno podrás evitar que tus clientes formen largas filas
            afuera de tu farmacia para obtener un turno. Lograrás una atención
            organizada, personalizada y empática, marcando un diferencial.
          </p>
          <p>
            Con un rápido y ágil registro, formarás parte de este nuevo sistema
            de gestión de turnos para farmacias.
          </p>
        </div>
        <div className="seccond-promoting">
          <div className="tittle-logo-container__promoting">
            <img src={calendar} alt="imagen de calendario" />
            <h2>Rapidez para clientes</h2>
          </div>
          <p>
            Conocemos la problemática que implican las largas filas de espera
            para obtener un turno en la farmacia, y nos comprometemos en brindar
            una solución.
          </p>
          <p>
            Podrás pedir un turno cuando quieras, sin importar dónde estés. Unos
            pocos datos serán necesarios para hacer tu reserva.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
