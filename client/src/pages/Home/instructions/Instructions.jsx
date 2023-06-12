import './instructions.css';
import mobileInstructions from './assets/pasopasomobile.png';
import tabletInstructions from './assets/pasoapasotablet.png';
import desktopInstructions from './assets/pasopasodesktop.png';
const Instructions = () => {
  return (
    <div className="instructions">
      <img className="mobile" src={mobileInstructions} alt="instrucciones" />
      <img className="tablet" src={tabletInstructions} alt="instrucciones" />
      <img className="desktop" src={desktopInstructions} alt="instrucciones" />
    </div>
  );
};

export default Instructions;
