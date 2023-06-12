import { ProgressBar } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import PharmacyOwnerDetails from './pharmacyOwnerDetails/PharmacyOwnerDetails';
import PharmacyDetails from './pharmacyDetails/PharmacyDetails';
import SignInDetails from './signInDetails/SignInDetails';
import './signUpPharmacy.css';
import { useContext } from 'react';
import { SignUpContext } from './context/pharmacyContext';
import { useEffect } from 'react';
import { useState } from 'react';
import backButton from './assets/backButton.svg';
import { useNavigate } from 'react-router';
const SignUpPharmacy = () => {
  const { formToShow, setFormToShow } = useContext(SignUpContext);
  const [now, setNow] = useState(0);
  const navigate = useNavigate();
  console.log(now);
  useEffect(() => {
    if (formToShow === 'a') {
      setNow(0);
    } else if (formToShow === 'b') {
      setNow(33.3);
    } else if (formToShow === 'c') {
      setNow(66.6);
    } else if (formToShow === 'd') {
      setNow(100);
    }
  }, [formToShow]);

  const handleClick = () => {
    if (formToShow === 'b') {
      setFormToShow('a');
    } else if (formToShow === 'c') {
      setFormToShow('b');
    } else if (formToShow === 'd') {
      setFormToShow('c');
    } else {
      navigate('/pharmacy');
    }
  };
  return (
    <section className="signUpPharmacy">
      <div className="title-button__container">
        <img
          className="goBackButton"
          src={backButton}
          alt="Boton para retornar al anterior formulario"
          onClick={handleClick}
        />
        <p>Regístrate ahora</p>
      </div>
      {formToShow === 'a' && <PharmacyOwnerDetails />}
      {formToShow === 'b' && <PharmacyDetails />}
      {(formToShow === 'c' || formToShow === 'd') && <SignInDetails />}
      <ProgressBar now={now} variant="success" className="progressBar" />
      <Footer />
    </section>
  );
};

export default SignUpPharmacy;
