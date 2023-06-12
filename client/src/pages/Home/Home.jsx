import PanelIngreso from './panelIngreso/PanelIngreso';
import './home.css';
import FirstDescription from './firstDescription/FirstDescription';
import Divider from './divider/Divider';
import About from './about/About';
import Instructions from './instructions/Instructions';
import Footer from '../../components/Footer/Footer';
import FarmaciaAdicionales from './FarmaciasAdicionales/FarmaciaAdicionales';
const Home = () => {
  return (
    <div className="home">
      <div className="welcomeSection">
        <div className="mensajeBienvenida">
          <p>Te damos la bienvenida a</p>
          <p> FarmaTurno</p>
        </div>
        <FarmaciaAdicionales />
        <PanelIngreso id="panelIngreso" />
      </div>
      <Instructions />
      <FirstDescription />
      <Divider />
      <About id="about" />
      <Footer />
    </div>
  );
};

export default Home;
