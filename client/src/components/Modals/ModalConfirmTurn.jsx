import './styleConfirm.css';
import logo from '../../images/success.png';
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
export default function ModalToConfirmYourTurn ({closeMenu}){
    const { date, timeSlot,  } =
    useSelector((state) => state.user);
    const navigate=useNavigate()
    return(
        <div className='container_modal_confirm'>
           <article>
           <header className='alert_display'><div className='logo'>
            <img src={logo} className='icon_alert' alt='icono de logrado' />
           </div>
           <button onClick={closeMenu}>X</button></header>
           <h3 className='message_alert'>Turno confirmado!</h3>
           <div className='data_turn'>
            <p>Fecha: {date}</p>
            <p>Horario: {timeSlot} hs</p>
           </div>
           <div className='describe_data'>
           Ya tienes disponible tu número de turno para recibir atención en la farmacia. 
Te enviaremos un email para que puedas verificar tus datos.
           </div>
           <footer className='btn_container'>
            <button className='check' onClick={()=>navigate('/miTurno')}>Consultar turno</button>
            <button className='came_back' onClick={()=>navigate('/')}>Volver al inicio</button>
           </footer>
            </article>
        </div>
    )
}