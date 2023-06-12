import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { useLocation } from 'react-router-dom';
function App() {
  let location = useLocation();
  return (
    //Aca van botones navbar y todo lo que este en el home
    <main className="main_container">
      {location.pathname !== '/pharmacy/profile' &&
      location.pathname !== `/pharmacy`&&
      location.pathname !== '/pharmacy/profile/data' ? (
        <NavBar />
      ) : (
        <></>
      )}

      <Outlet />


      {location.pathname !== '/' &&
      location.pathname !== '/nuevoTurno' &&
      location.pathname !== '/pharmacy/signUp' &&
      location.pathname !== '/pharmacy/profile' &&
      location.pathname !== '/pharmacy/signUp/adminitration_allowed' &&
      location.pathname !== '/pharmacy/recoverPassword/codeandpassword' &&
      location.pathname !== '/pharmacy' &&
      location.pathname !== '/pharmacy/profile/data'? (
        <Footer />
      ) : (
        <></>
      )}
    </main>
  );
}

export default App;
