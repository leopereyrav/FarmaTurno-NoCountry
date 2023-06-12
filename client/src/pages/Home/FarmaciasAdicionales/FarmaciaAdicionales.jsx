import './farmaciasAdeheridas.css';
import cruzVerde from './assets/logotipoCruzVerde.png';
import substract from './assets/Subtract.png';
import { useNavigate } from 'react-router';
const FarmaciaAdicionales = () => {
  const navigate = useNavigate();
  return (
    <div className="adheridasFarmacia">
      <h2>Farmacias y droguerías adheridas</h2>
      <div className="farmaciaBotom">
        <img
          className="cruzVerde"
          src={cruzVerde}
          alt="Logotipo de farmacia cruz verde"
        />
        <button onClick={() => navigate('/pharmacy')}>
          <img src={substract} alt="icono de sumar farmacia" />
          Adherir mi farmacia
        </button>
      </div>
    </div>
  );
};

export default FarmaciaAdicionales;
